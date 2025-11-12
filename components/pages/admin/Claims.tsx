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
import { Search, Eye, UserPlus, Trash2 } from 'lucide-react';
import { mockClaims } from '@/mock/claims';
import { useState } from 'react';
import { VerdictBadge } from '@/components/custom/ui/VerdictBadge';
import Link from 'next/link';

const ClaimsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredClaims = mockClaims.filter(claim => {
    const matchesSearch = claim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         claim.lga.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.verdict === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // TODO: connect to backend for claim management

  return (
      <div className="p-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Claims Queue</h1>
            <p className="text-muted-foreground">Manage and review submitted claims</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search claims..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Claims</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="true">Verified True</SelectItem>
                <SelectItem value="false">Verified False</SelectItem>
                <SelectItem value="inconclusive">Inconclusive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>LGA</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-mono text-sm">#{claim.id}</TableCell>
                    <TableCell className="font-medium max-w-xs truncate">
                      {claim.title}
                    </TableCell>
                    <TableCell>{claim.lga}</TableCell>
                    <TableCell>{claim.category}</TableCell>
                    <TableCell>
                      <VerdictBadge verdict={claim.verdict} size="sm" />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(claim.submittedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/claims/${claim.id}`}>
                          <Button variant="ghost" size="icon" title="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" title="Assign">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredClaims.length === 0 && (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground">No claims found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default ClaimsPage;
