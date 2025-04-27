import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/layout/Header';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  deleteDoc, 
  doc,
  updateDoc 
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, RefreshCw } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { user, loading, isAuthenticated, isAnonymous } = useAuth();
  const navigate = useNavigate();
  const [userItems, setUserItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalReported: 0,
    totalReturned: 0,
    activeListings: 0
  });

  useEffect(() => {
    // Redirect if not authenticated or anonymous
    if (!loading && (!isAuthenticated || isAnonymous)) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, isAnonymous, navigate]);

  const fetchUserItems = async () => {
    if (user && !isAnonymous) {
      setIsLoading(true);
      try {
        // Get items reported by this user
        const itemsRef = collection(db, 'foundItems');
        const q = query(itemsRef, where('contact', '==', user.email));
        const querySnapshot = await getDocs(q);
        
        const items = [];
        let returned = 0;
        querySnapshot.forEach((doc) => {
          const itemData = {
            id: doc.id,
            ...doc.data()
          };
          items.push(itemData);
          
          // Count returned items
          if (itemData.isReturned) {
            returned++;
          }
        });
        
        setUserItems(items);
        setDashboardStats({
          totalReported: items.length,
          totalReturned: returned,
          activeListings: items.length - returned
        });
        
        console.log("Found items:", items.length);
      } catch (error) {
        console.error("Error fetching user items:", error);
        toast({
          title: "Error",
          description: "Failed to load your items. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user && !loading) {
      fetchUserItems();
    }
  }, [user, isAnonymous, loading]);

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, 'foundItems', itemToDelete));
      
      // Update local state
      setUserItems(prevItems => prevItems.filter(item => item.id !== itemToDelete));
      
      // Update stats
      const deletedItem = userItems.find(item => item.id === itemToDelete);
      if (deletedItem) {
        setDashboardStats(prev => ({
          ...prev,
          totalReported: prev.totalReported - 1,
          totalReturned: deletedItem.isReturned ? prev.totalReturned - 1 : prev.totalReturned,
          activeListings: deletedItem.isReturned ? prev.activeListings : prev.activeListings - 1
        }));
      }
      
      toast({
        title: "Item Deleted",
        description: "The item has been successfully removed.",
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting the item.",
        variant: "destructive"
      });
    } finally {
      setItemToDelete(null);
      setConfirmDialogOpen(false);
    }
  };

  const toggleItemReturnedStatus = async (itemId, currentStatus) => {
    try {
      // Update the document in Firestore
      await updateDoc(doc(db, 'foundItems', itemId), {
        isReturned: !currentStatus
      });
      
      // Update local state
      setUserItems(prevItems => prevItems.map(item => 
        item.id === itemId ? { ...item, isReturned: !currentStatus } : item
      ));
      
      // Update stats
      setDashboardStats(prev => ({
        ...prev,
        totalReturned: currentStatus ? prev.totalReturned - 1 : prev.totalReturned + 1,
        activeListings: currentStatus ? prev.activeListings + 1 : prev.activeListings - 1
      }));
      
      toast({
        title: currentStatus ? "Item Marked as Active" : "Item Marked as Returned",
        description: currentStatus ? 
          "The item has been marked as active again." : 
          "Congratulations on returning the item to its owner!",
      });
    } catch (error) {
      console.error("Error updating item status:", error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the item status.",
        variant: "destructive"
      });
    }
  };

  if (loading || (!isAuthenticated || isAnonymous)) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-12 px-4 text-center">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome, {user.displayName || user.email}</CardTitle>
              <CardDescription>Manage your account and found items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="py-4 px-4">
                    <CardTitle className="text-lg font-medium text-center">Total Reported</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0 flex justify-center">
                    <span className="text-4xl font-bold text-purple-600">{dashboardStats.totalReported}</span>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-4 px-4">
                    <CardTitle className="text-lg font-medium text-center">Items Returned</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0 flex justify-center">
                    <span className="text-4xl font-bold text-green-600">{dashboardStats.totalReturned}</span>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-4 px-4">
                    <CardTitle className="text-lg font-medium text-center">Active Listings</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0 flex justify-center">
                    <span className="text-4xl font-bold text-blue-600">{dashboardStats.activeListings}</span>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="my-items" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="my-items">My Reported Items</TabsTrigger>
              <TabsTrigger value="account">Account Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-items">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Found Items</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchUserItems}
                  className="flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                  <p className="text-center py-8 col-span-2">Loading your items...</p>
                ) : userItems.length > 0 ? (
                  userItems.map((item) => (
                    <Card 
                      key={item.id} 
                      className={`hover:shadow-md transition-shadow ${item.isReturned ? 'bg-gray-50' : ''}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">{item.title || 'Unnamed Item'}</CardTitle>
                          <div className="flex space-x-2">
                            <Badge variant={item.isReturned ? "outline" : "default"} className={item.isReturned ? "border-green-500 text-green-700" : ""}>
                              {item.isReturned ? "Returned" : "Active"}
                            </Badge>
                            <Badge variant="secondary">{item.category}</Badge>
                          </div>
                        </div>
                        <CardDescription>
                          Found on: {item.foundDate || 'Unknown date'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        {item.imageUrl && (
                          <div className="w-full h-40 mb-3 overflow-hidden rounded-md cursor-pointer" onClick={() => navigate(`/item/${item.id}`)}>
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="w-full h-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                        )}
                        <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                          {item.description || 'No description available'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Location: {item.location || 'Unknown location'}
                        </p>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2">
                        <div className="grid grid-cols-2 gap-2 w-full">
                          <Button 
                            onClick={() => navigate(`/item/${item.id}`)} 
                            variant="outline" 
                            size="sm"
                            className="w-full"
                          >
                            View Details
                          </Button>
                          <Button
                            onClick={() => toggleItemReturnedStatus(item.id, item.isReturned)}
                            variant={item.isReturned ? "outline" : "secondary"}
                            size="sm"
                            className={`w-full ${item.isReturned ? "border-green-500 text-green-700 hover:bg-green-50" : ""}`}
                          >
                            {item.isReturned ? "Mark as Active" : "Mark as Returned"}
                          </Button>
                        </div>
                        <Button
                          onClick={() => {
                            setItemToDelete(item.id);
                            setConfirmDialogOpen(true);
                          }}
                          variant="destructive"
                          size="sm"
                          className="w-full"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Item
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 col-span-2">
                    <p className="text-gray-500 mb-4">You haven't reported any found items yet.</p>
                    <Button onClick={() => navigate('/report-found')}>
                      Report a Found Item
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Email</p>
                    <p className="text-gray-700">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Account Type</p>
                    <p className="text-gray-700">
                      {user.providerData[0]?.providerId === 'password' 
                        ? 'Email/Password' 
                        : user.providerData[0]?.providerId === 'google.com' 
                          ? 'Google' 
                          : 'Unknown'}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/profile')}
                  >
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the item from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteItem} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Dashboard;