import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import axios from "axios";

const categories = [
  "Electronics",
  "Books",
  "Clothing",
  "Accessories",
  "Keys",
  "IDs & Cards",
  "Others",
];

const locations = [
  "Tech Park (TP)",
  "Main Campus Building (Admin Block)",
  "Basic Sciences Block",
  "ESB (Engineering and Sciences Block)",
  "Architecture Block",
  "Civil Block",
  "MBA/Management Block",
  "Medical College Building",
  "Dental College",
  "Law Block",
  "Boys Hostel - GH 1 to GH 6",
  "Girls Hostel - LH 1 to LH 7",
  "International Hostel",
  "Medical Hostel",
  "MBA HostelMess 1, 2, 3",
  "Tech Park Cafeteria",
  "Java Green / Café Coffee Day",
  "OAT (Open Air Theatre)",
  "University Canteen",
  "SRM Night Canteen",
  "SRM Bookstore / Coop Store",
  "Main Gate / Entrance",
  "Rear Gate (Potheri Gate)",
  "Railway Station Overbridge",
  "Bus Stops (Campus shuttle stop)",
  "Indoor Stadium",
  "Football Ground",
  "Basketball Court",
  "Swimming Pool",
  "Central Library",
  "SRM Hospital (Main Hospital Building)",
  "Pharmacy",
  "ATM Areas (SBI, HDFC, etc.)",
  "Post Office / Courier Center",
  "Dr. T.P. Ganesan Auditorium",
  "Mini Auditorium (MBA Block)",
  "Milan / Aaruush Event Zones",
];

const maskProductNumber = (code) => {
  if (!code || code.length < 4) return code;
  const visiblePart = code.slice(-4);
  const maskedPart = "*".repeat(code.length - 4);
  return maskedPart + visiblePart;
};

const ReportFound = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [foundDate, setFoundDate] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      !title ||
      !category ||
      !foundDate ||
      !location ||
      !contact ||
      !description
    ) {
      toast({
        title: "Incomplete Submission",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const maskedProductNumber = maskProductNumber(productNumber);
    let imageUrl = "";

    if (image) {
      try {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "unsigned_preset");
        formData.append("cloud_name", "dqryif7de");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dqryif7de/image/upload",
          formData
        );
        imageUrl = response.data.secure_url;
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
        toast({
          title: "Image Upload Failed",
          description: "Unable to upload the image. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

    try {
      await addDoc(collection(db, "foundItems"), {
        title,
        category,
        foundDate,
        location,
        contact,
        phone,
        description,
        productNumber,
        maskedProductNumber,
        imageUrl,
        createdAt: Timestamp.now(),
        isReturned: false  // Add this line
      });

      toast({
        title: "Found Item Reported",
        description:
          "Thank you for reporting the found item. It'll be visible in our database for 30 days.",
      });

      // Reset form
      setTitle("");
      setCategory("");
      setFoundDate("");
      setLocation("");
      setContact("");
      setPhone("");
      setDescription("");
      setProductNumber("");
      setImage(null);
    } catch (error) {
      console.error("Error saving data:", error);
      toast({
        title: "Submission Failed",
        description: "Could not submit your report. Please try again later.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Report a Found Item
          </h1>
          <p className="text-lg text-gray-600">
            Help others reclaim lost belongings by reporting what you've found
            on campus.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Item Name/Title</Label>
              <Input
                id="title"
                placeholder="E.g. Blue Backpack"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="foundDate">Date Found</Label>
                <Input
                  id="foundDate"
                  type="date"
                  value={foundDate}
                  onChange={(e) => setFoundDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Where Found</Label>
                <Select value={location} onValueChange={setLocation} required>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Your Contact Email</Label>
                <Input
                  id="contact"
                  type="email"
                  placeholder="your.email@example.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Your Phone Number (Recommended for valuable items)
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="E.g. +91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                We recommend providing a phone number for valuable or expensive
                items. Don't worry - we respect your privacy. Your phone number
                remains hidden until the owner proves ownership by verifying the
                product code.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productNumber">
                Product Number / Serial Code (Recommended for valuable items)
              </Label>
              <Input
                id="productNumber"
                placeholder="E.g. SN12345678"
                value={productNumber}
                onChange={(e) => setProductNumber(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                This helps confirm ownership. Only last 4 digits will be shown
                publicly.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Item Description</Label>
              <Textarea
                id="description"
                placeholder="Provide details like color, brand, marks, etc."
                className="min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Upload Image</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                />
                <Button type="button" variant="outline" size="icon">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                A clear image makes it easier for owners to recognize the item.
              </p>

              {image && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Preview:</p>
                  <div className="mt-1 relative h-40 w-40 rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Found Item Report"}
              </Button>
              <p className="text-sm text-gray-500 text-center mt-4">
                The item will be listed for 30 days. Owners can search and claim
                it during this time.
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ReportFound;
