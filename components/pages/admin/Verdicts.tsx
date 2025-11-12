"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Eye } from 'lucide-react';
import { mockClaims } from '@/mock/claims';
import { useState } from 'react';
import { VerdictBadge } from '@/components/custom/ui/VerdictBadge';
import Link from 'next/link';

const VerdictsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [verdictFilter, setVerdictFilter] = useState('all');
  
  const publishedClaims = mockClaims.filter(c => c.verdict !== 'pending');
  
  const filteredClaims = publishedClaims.filter(claim => {
    const matchesSearch = claim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         claim.investigator?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVerdict = verdictFilter === 'all' || claim.verdict === verdictFilter;
    return matchesSearch && matchesVerdict;
  });

  return (
      <div className="p-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Published Verdicts</h1>
            <p className="text-muted-foreground">View all verified claims</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search verdicts..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={verdictFilter} onValueChange={setVerdictFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by verdict" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Verdicts</SelectItem>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
                <SelectItem value="inconclusive">Inconclusive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim Title</TableHead>
                  <TableHead>Verdict</TableHead>
                  <TableHead>Researcher</TableHead>
                  <TableHead>Verdict Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium max-w-md truncate">
                      {claim.title}
                    </TableCell>
                    <TableCell>
                      <VerdictBadge verdict={claim.verdict} size="sm" />
                    </TableCell>
                    <TableCell>{claim.investigator || 'N/A'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {claim.verdictDate
                        ? new Date(claim.verdictDate).toLocaleDateString()
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/claims/${claim.id}`}>
                        <Button variant="ghost" size="icon" title="View">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredClaims.length === 0 && (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground">No verdicts found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default VerdictsPage;
