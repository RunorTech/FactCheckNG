"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import { stateLGAs } from './state_lga';

const SubmitClaimsPage = () => {
  const [anonymous, setAnonymous] = useState(false);
  const [selectedState, setSelectedState] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend API for submission
    toast.success('Claim submitted successfully! Our team will review it shortly.');
  };

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Submit a Claim</h1>
            <p className="text-lg text-muted-foreground">
              Help us verify information circulating in your community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Claim Title *</Label>
              <Input
                id="title"
                placeholder="Enter a brief summary of the claim"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide more details about where you heard this claim and why it needs verification"
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>State *</Label>
                <Select onValueChange={(value) => setSelectedState(value)} required>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(stateLGAs).map((state) => (
                      <SelectItem key={state} value={state}>
                        {state.charAt(0).toUpperCase() + state.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Local Government Area *</Label>
                <Select disabled={!selectedState} required>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder={selectedState ? "Select LGA" : "Select a state first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedState &&
                      stateLGAs[selectedState].map((lga) => (
                        <SelectItem key={lga} value={lga.toLowerCase().replace(/\s/g, "-")}>
                          {lga}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select required>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachments">Upload Attachments (Optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload images, videos, or documents
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum file size: 10MB
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="anonymous">Submit Anonymously</Label>
                <p className="text-sm text-muted-foreground">
                  Your identity will not be shared publicly
                </p>
              </div>
              <Switch
                id="anonymous"
                checked={anonymous}
                onCheckedChange={setAnonymous}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" size="lg" className="flex-1">
                Submit Claim
              </Button>
              <Button type="button" variant="outline" size="lg">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>

    </div>
  );
};

export default SubmitClaimsPage;
