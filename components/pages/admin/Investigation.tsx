/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Plus, X } from 'lucide-react';
import { getClaimById } from '@/mock/claims';
import { useState } from 'react';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { VerdictBadge } from '@/components/custom/ui/VerdictBadge';

const Investigation = () => {
  const { id } = useParams();
  const router = useRouter();
  const claim = getClaimById('1');
  
  const [verdict, setVerdict] = useState(claim?.verdict || 'pending');
  const [summary, setSummary] = useState(claim?.verdictSummary || '');
  const [citations, setCitations] = useState<string[]>(
    claim?.citations.map(c => c.url) || ['']
  );

  if (!claim) {
    return (
        <div className="p-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Claim Not Found</h1>
          <Button onClick={() => router.push('/admin/claims')}>
              Back to Claims
            </Button>
          </div>
        </div>
    );
  }

  const handleAddCitation = () => {
    setCitations([...citations, '']);
  };

  const handleRemoveCitation = (index: number) => {
    setCitations(citations.filter((_, i) => i !== index));
  };

  const handleCitationChange = (index: number, value: string) => {
    const newCitations = [...citations];
    newCitations[index] = value;
    setCitations(newCitations);
  };

  const handleSaveDraft = () => {
    // TODO: connect to backend for saving draft
    toast.success('Draft saved successfully');
  };

  const handlePublish = () => {
    // TODO: connect to backend for verdict publishing
    toast.success('Verdict published successfully');
    router.push('/admin/verdicts');
  };

  return (
      <div className="p-8 bg-background">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Investigation</h1>
            <p className="text-muted-foreground">Review and verify claim #{claim.id}</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="flex-1">{claim.title}</CardTitle>
                <VerdictBadge verdict={claim.verdict} />
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{claim.lga}, {claim.state}</span>
                </div>
                <Badge variant="secondary">{claim.category}</Badge>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(claim.submittedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{claim.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verdict Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="verdict">Verdict *</Label>
                <Select value={verdict} onValueChange={(value) => setVerdict(value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select verdict" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Verified True</SelectItem>
                    <SelectItem value="false">Verified False</SelectItem>
                    <SelectItem value="inconclusive">Inconclusive</SelectItem>
                    <SelectItem value="pending">Pending Investigation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Verdict Summary *</Label>
                <Textarea
                  id="summary"
                  placeholder="Write a clear, concise summary of your findings..."
                  rows={5}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Citations & Sources</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddCitation}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Citation
                  </Button>
                </div>
                
                {citations.map((citation, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="https://example.com/source"
                      value={citation}
                      onChange={(e) => handleCitationChange(index, e.target.value)}
                    />
                    {citations.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveCitation(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidence">Upload Evidence (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center text-sm text-muted-foreground">
                  Click to upload images, videos, or documents
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button size="lg" onClick={handlePublish}>
              Publish Verdict
            </Button>
            <Button variant="outline" size="lg" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button
              variant="ghost"
              size="lg"
            onClick={() => router.push('/admin/claims')}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
  );
};

export default Investigation;
