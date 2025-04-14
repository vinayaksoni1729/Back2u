import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Define the type for our item
interface ItemType {
  id: string;
  title: string;
  image: string;
  category: string;
  location: string;
  date: string;
  foundDate?: string;
  status: string;
  description: string;
  productNumber?: string;
  maskedProductNumber?: string;
  reportedBy?: string;
  contact?: string;
  contactEmail?: string;
  imageUrl?: string;
  createdAt?: any;
}

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [claimed, setClaimed] = useState(false);
  const [item, setItem] = useState<ItemType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState<string>(""); // For verifying the product number
  const [isCodeCorrect, setIsCodeCorrect] = useState(false); // To track if the entered code is correct
  const [codeAttempted, setCodeAttempted] = useState(false); // Track if user attempted to enter code
  const foundUserId = localStorage.getItem("foundUserId"); // current user's ID

  // Fetch item data from Firebase
  useEffect(() => {
    const fetchItem = async () => {
      if (!id) {
        setError("Item ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const docRef = doc(db, "foundItems", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setItem({
            id: docSnap.id,
            title: data.title || "Untitled Item",
            image: data.imageUrl || data.image || "/placeholder.svg",
            category: data.category || "Other",
            location: data.location || "Unknown",
            date:
              data.foundDate ||
              data.date ||
              new Date().toISOString().split("T")[0],
            status: data.status || "found",
            description: data.description || "No description provided",
            reportedBy: data.reportedBy || "Anonymous",
            contactEmail: data.contact || data.contactEmail || "Not provided",
            contact: data.phone || "Not provided",
            productNumber: data.productNumber,
            maskedProductNumber: data.maskedProductNumber,
          });
        } else {
          setError("Item not found");
        }
      } catch (err) {
        console.error("Error fetching document:", err);
        setError("Failed to load item details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleClaimClick = () => {
    if (item?.productNumber) {
      // For code items
      setCodeAttempted(true);
// Inside handleClaimClick function, when code is verified correctly:
if (inputCode === item.productNumber) {
  setIsCodeCorrect(true);
  
  // Notify the found item reporter
  fetch("https://back2u.vercel.app/api/send-claim-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      toEmail: item.contactEmail,
      itemTitle: item.title,
      // No need for complex user information, keeping it simple as requested
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error("Failed to send email:", err);
      toast({
        title: "Notification failed",
        description: "We couldn't notify the item owner, but your claim was successful.",
        variant: "destructive",
        duration: 5000,
      });
    });

  toast({
    title: "Claim successful",
    description: "You've successfully verified the product code. You can now contact the person who found it.",
    duration: 5000,
  });
}
       else {
        setIsCodeCorrect(false);
        toast({
          title: "Verification failed",
          description:
            "The product number you entered is incorrect, but you can still contact the owner via email.",
          duration: 5000,
        });
      }
    } else {
      // For non-code items
      setClaimed(true);
      toast({
        title: "Item claimed",
        description: "You can now contact the owner to claim this item.",
        duration: 5000,
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center">
          <p>Loading item details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !item) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-6">
            <Link
              to="/found-items"
              className="text-purple-600 hover:text-purple-700 flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Found Items
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-medium text-red-500 mb-2">Error</h2>
            <p className="text-gray-700">{error || "Failed to load item"}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-6">
          <Link to="/found-items" className="text-purple-600 hover:text-purple-700 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Found Items
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                {/* Display Masked Product Number */}
                {item.maskedProductNumber && !claimed && !codeAttempted && (
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">Product Number</h2>
                    <div className="flex items-center mt-1">
                      <span className="font-mono">{item.maskedProductNumber}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      The owner must verify the full code to claim this item.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-l border-gray-100">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h1>

              {/* Item Description */}
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-500">Description</h2>
                <p className="text-gray-700 mt-1">{item.description}</p>
              </div>

              {/* Product Code Section (only if productNumber exists) */}
              {item.productNumber && !codeAttempted ? (
                <>
                  {foundUserId === item.reportedBy ? (
                    <div className="text-green-600 font-medium">
                      You reported this item. No need to enter the code.
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="productCode" className="block text-sm font-medium text-gray-700">Enter Product Code</label>
                        <input
                          type="text"
                          id="productCode"
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          maxLength={10}
                        />
                      </div>

                      <Button 
                        onClick={handleClaimClick}
                        className="w-full bg-purple-500 hover:bg-purple-600"
                      >
                        Verify Code
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* For non-code items or after code attempt */}
                  {!claimed && !codeAttempted && (
                    <div className="mb-4">
                      <Button
                        onClick={handleClaimClick}
                        className="w-full bg-green-500 hover:bg-green-600"
                      >
                        Claim This Item
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* Show contact details after claim or code attempt */}
              {(claimed || codeAttempted) && (
                <div className="mt-4 bg-green-100 p-4 rounded-md border border-green-200">
                  <h3 className="font-medium text-gray-700">Contact Details</h3>
                  
                  {/* Always show email */}
                  <p className="text-sm text-gray-600">Email: {item.contactEmail || 'Not provided'}</p>
                  
                  {/* Show phone only if code is correct */}
                  {(isCodeCorrect || !item.productNumber) && (
                    <p className="text-sm text-gray-600">Phone: {item.contact || 'Not provided'}</p>
                  )}
                  
                  {/* Message for failed code verification */}
                  {item.productNumber && codeAttempted && !isCodeCorrect && (
                    <p className="mt-2 text-sm italic text-gray-600">
                      It seems you couldn't verify the code, but you can still claim this item by contacting the owner via email.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;