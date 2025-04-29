import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChartBar, ChartPie, Download, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Logo from "@/components/layout/Logo";
import { toast } from "sonner";

// Mock data for the admin dashboard (kept from original)
const MOCK_FEEDBACK_DATA = [
  { id: 1, customerName: "John Doe", date: "2023-04-25", storeLocation: "Lagos - Ikeja Mall", staffFriendliness: 8, cleanliness: 9, productAvailability: 7, overallExperience: 8, comment: "Great experience overall, staff was very helpful." },
  { id: 2, customerName: "Anonymous", date: "2023-04-24", storeLocation: "Abuja - Wuse II", staffFriendliness: 6, cleanliness: 5, productAvailability: 4, overallExperience: 5, comment: "The store was not very clean, and some products were out of stock." },
  { id: 3, customerName: "Sarah Johnson", date: "2023-04-23", storeLocation: "Lagos - Lekki Phase 1", staffFriendliness: 9, cleanliness: 8, productAvailability: 9, overallExperience: 9, comment: "Excellent service, very satisfied customer." },
  { id: 4, customerName: "Michael Brown", date: "2023-04-22", storeLocation: "Port Harcourt - GRA", staffFriendliness: 7, cleanliness: 8, productAvailability: 6, overallExperience: 7, comment: "Good experience, but some products were missing." },
  { id: 5, customerName: "Anonymous", date: "2023-04-21", storeLocation: "Abuja - Jabi Lake Mall", staffFriendliness: 5, cleanliness: 6, productAvailability: 7, overallExperience: 6, comment: "Average experience, staff could be more friendly." },
];

// Mock data for the charts (kept from original)
const STORE_PERFORMANCE_DATA = [
  { name: "Lagos - Ikeja Mall", staffFriendliness: 8.2, cleanliness: 8.5, productAvailability: 7.8, overallExperience: 8.1 },
  { name: "Lagos - Lekki Phase 1", staffFriendliness: 8.9, cleanliness: 8.7, productAvailability: 9.1, overallExperience: 8.9 },
  { name: "Abuja - Wuse II", staffFriendliness: 7.1, cleanliness: 6.8, productAvailability: 6.5, overallExperience: 6.8 },
  { name: "Abuja - Jabi Lake Mall", staffFriendliness: 7.5, cleanliness: 7.6, productAvailability: 7.9, overallExperience: 7.7 },
  { name: "Port Harcourt - GRA", staffFriendliness: 8.0, cleanliness: 8.2, productAvailability: 7.4, overallExperience: 7.9 },
];

// Pie chart data (kept from original)
const ISSUE_DISTRIBUTION_DATA = [
  { name: "Mislabelled products", value: 15 },
  { name: "Unusual taste/odor", value: 25 },
  { name: "Texture issues", value: 20 },
  { name: "Mold or spoilage", value: 10 },
  { name: "Foreign elements", value: 5 },
  { name: "Other issues", value: 25 },
];

// Colors for the pie chart (updated to match Indomie branding)
const COLORS = ["#E51E25", "#FFC72C", "#2D2926", "#5AA9E6", "#7FC8A9", "#9F9F9F"];

export default function Admin() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedStore, setSelectedStore] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter feedback data based on selected filters
  const filteredFeedback = MOCK_FEEDBACK_DATA.filter((feedback) => {
    const dateMatch = !startDate || !endDate || (new Date(feedback.date) >= startDate && new Date(feedback.date) <= endDate);
    const storeMatch = selectedStore === "all" || feedback.storeLocation === selectedStore;
    const searchMatch = searchTerm === "" || 
      feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      feedback.comment.toLowerCase().includes(searchTerm.toLowerCase());
    return dateMatch && storeMatch && searchMatch;
  });

  const handleExportExcel = () => {
    toast.success("Exporting data to Excel...");
    // In a real app, this would trigger an API call to generate and download an Excel file
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 noodle-pattern">
      {/* Fixed Header */}
      <header className="w-full bg-white border-b py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/home")}
            >
              Back to Home
            </Button>
            <Button 
              variant="default"
              className="bg-indomie-red hover:bg-indomie-red/90 relative overflow-hidden group"
              onClick={() => navigate("/login")}
            >
              <span className="relative z-10">Logout</span>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-indomie-yellow transition-all duration-300 group-hover:h-full -z-0"></span>
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Dashboard - add padding-top for the fixed header */}
      <div className="flex-1 py-8 px-6 pt-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <Tabs defaultValue="reports" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <Card className="shadow-lg border border-indomie-yellow/10 relative overflow-hidden">
                <div className="absolute inset-0 noodle-bg-light opacity-20"></div>
                <CardHeader className="relative z-10">
                  <CardTitle>Feedback Reports</CardTitle>
                  <CardDescription>
                    View and filter customer feedback data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  {/* Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Store Location</label>
                      <Select 
                        value={selectedStore}
                        onValueChange={setSelectedStore}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select store" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Stores</SelectItem>
                          {STORE_PERFORMANCE_DATA.map((store) => (
                            <SelectItem key={store.name} value={store.name}>
                              {store.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Search</label>
                      <div className="relative">
                        <Input
                          placeholder="Search feedback..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setStartDate(undefined);
                        setEndDate(undefined);
                        setSelectedStore("all");
                        setSearchTerm("");
                      }}
                      className="flex items-center gap-1"
                    >
                      <Filter className="h-4 w-4" />
                      Reset Filters
                    </Button>
                    
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={handleExportExcel}
                      className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                    >
                      <Download className="h-4 w-4" />
                      Export to Excel
                    </Button>
                  </div>
                  
                  {/* Feedback Table */}
                  <div className="rounded-md border overflow-hidden bg-white shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clean</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredFeedback.map((feedback) => (
                            <tr key={feedback.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feedback.customerName}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.storeLocation}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={cn(
                                  "px-2 py-1 rounded-full text-xs font-medium",
                                  feedback.staffFriendliness >= 8 ? "bg-green-100 text-green-800" :
                                  feedback.staffFriendliness >= 6 ? "bg-yellow-100 text-yellow-800" : 
                                  "bg-red-100 text-red-800"
                                )}>
                                  {feedback.staffFriendliness}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={cn(
                                  "px-2 py-1 rounded-full text-xs font-medium",
                                  feedback.cleanliness >= 8 ? "bg-green-100 text-green-800" :
                                  feedback.cleanliness >= 6 ? "bg-yellow-100 text-yellow-800" : 
                                  "bg-red-100 text-red-800"
                                )}>
                                  {feedback.cleanliness}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={cn(
                                  "px-2 py-1 rounded-full text-xs font-medium",
                                  feedback.productAvailability >= 8 ? "bg-green-100 text-green-800" :
                                  feedback.productAvailability >= 6 ? "bg-yellow-100 text-yellow-800" : 
                                  "bg-red-100 text-red-800"
                                )}>
                                  {feedback.productAvailability}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={cn(
                                  "px-2 py-1 rounded-full text-xs font-medium",
                                  feedback.overallExperience >= 8 ? "bg-green-100 text-green-800" :
                                  feedback.overallExperience >= 6 ? "bg-yellow-100 text-yellow-800" : 
                                  "bg-red-100 text-red-800"
                                )}>
                                  {feedback.overallExperience}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{feedback.comment}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Charts Tab */}
            <TabsContent value="charts" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg border border-indomie-yellow/10 relative overflow-hidden">
                  <div className="absolute inset-0 noodle-bg-light opacity-20"></div>
                  <CardHeader className="flex flex-row items-center justify-between relative z-10">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <ChartBar className="h-5 w-5" />
                        Store Performance Comparison
                      </CardTitle>
                      <CardDescription>
                        Average ratings across all stores
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={STORE_PERFORMANCE_DATA}
                          margin={{ top: 20, right: 30, left: 0, bottom: 120 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="name" 
                            angle={-45} 
                            textAnchor="end" 
                            height={80}
                            interval={0}
                          />
                          <YAxis domain={[0, 10]} />
                          <Tooltip />
                          <Bar dataKey="staffFriendliness" name="Staff Friendliness" fill="#E51E25" />
                          <Bar dataKey="cleanliness" name="Cleanliness" fill="#FFC72C" />
                          <Bar dataKey="productAvailability" name="Product Availability" fill="#2D2926" />
                          <Bar dataKey="overallExperience" name="Overall Experience" fill="#5AA9E6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg border border-indomie-yellow/10 relative overflow-hidden">
                  <div className="absolute inset-0 noodle-bg-light opacity-20"></div>
                  <CardHeader className="flex flex-row items-center justify-between relative z-10">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <ChartPie className="h-5 w-5" />
                        Issue Distribution
                      </CardTitle>
                      <CardDescription>
                        Common issues reported by customers
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={ISSUE_DISTRIBUTION_DATA}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {ISSUE_DISTRIBUTION_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card className="shadow-lg border border-indomie-yellow/10 relative overflow-hidden">
                <div className="absolute inset-0 noodle-bg-light opacity-20"></div>
                <CardHeader className="relative z-10">
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>
                    Key metrics and insights from customer feedback
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { title: "Highest Rated Branch", value: "Lagos - Lekki Phase 1", score: "8.9/10", trend: "up" },
                      { title: "Lowest Rated Branch", value: "Abuja - Wuse II", score: "6.8/10", trend: "down" },
                      { title: "Best Service Quality", value: "Lagos - Lekki Phase 1", score: "9.1/10", trend: "up" },
                      { title: "Most Improved", value: "Port Harcourt - GRA", score: "+1.2 pts", trend: "up" },
                    ].map((metric, index) => (
                      <Card key={index} className="shadow-sm hover:shadow-md transition-shadow bg-white/70 backdrop-blur-sm border border-indomie-yellow/10">
                        <CardContent className="p-4">
                          <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                          <h3 className="text-xl font-bold mt-1">{metric.value}</h3>
                          <div className={cn(
                            "text-sm font-medium mt-1 flex items-center",
                            metric.trend === "up" ? "text-green-600" : "text-red-600"
                          )}>
                            <span>{metric.score}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Top Customer Complaints</h3>
                    <div className="space-y-4">
                      {[
                        { issue: "Unusual taste in Chicken flavor", count: 15, locations: ["Lagos - Ikeja Mall", "Abuja - Wuse II"] },
                        { issue: "Packaging damage during transportation", count: 12, locations: ["Port Harcourt - GRA"] },
                        { issue: "Product availability issues", count: 10, locations: ["Abuja - Wuse II", "Kano - Nassarawa"] },
                      ].map((complaint, index) => (
                        <div key={index} className="p-4 border rounded-md bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{complaint.issue}</h4>
                            <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                              {complaint.count} reports
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            <span className="font-medium">Affected locations:</span> {complaint.locations.join(", ")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="shadow-lg border border-indomie-yellow/10 relative overflow-hidden">
                <div className="absolute inset-0 noodle-bg-light opacity-20"></div>
                <CardHeader className="relative z-10">
                  <CardTitle>Report Settings</CardTitle>
                  <CardDescription>
                    Configure your reporting preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Export Frequency</label>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Report Format</label>
                      <Select defaultValue="excel">
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                          <SelectItem value="pdf">PDF Document</SelectItem>
                          <SelectItem value="csv">CSV File</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Recipients</label>
                    <Input 
                      placeholder="Enter email addresses (comma-separated)"
                      defaultValue="admin@indomie.com, manager@indomie.com"
                    />
                    <p className="text-xs text-gray-500">Reports will be automatically sent to these email addresses.</p>
                  </div>
                  
                  <Button className="bg-indomie-red hover:bg-indomie-red/90 relative overflow-hidden group">
                    <span className="relative z-10">Save Settings</span>
                    <span className="absolute bottom-0 left-0 w-full h-0 bg-indomie-yellow transition-all duration-300 group-hover:h-full -z-0"></span>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
