"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usersData, type PortfolioItem } from "@/lib/data";
import {
  ArrowLeft,
  Pencil,
  Plus,
  Trash2,
  Wallet,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const userData = usersData[userId];

  const [portfolio, setPortfolio] = useState(userData?.portfolio || []);
  const [editingAsset, setEditingAsset] = useState<PortfolioItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAsset, setNewAsset] = useState<Partial<PortfolioItem>>({
    name: "",
    symbol: "",
    type: "Stock",
    invested: 0,
    currentValue: 0,
  });

  if (!userData) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/admin/users" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Link>
        </Button>
        <Card className="border-0 shadow-sm">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">User not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleUpdateAsset = (asset: PortfolioItem) => {
    setPortfolio((prev) =>
      prev.map((p) => (p.id === asset.id ? asset : p))
    );
    setEditingAsset(null);
  };

  const handleDeleteAsset = (assetId: string) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== assetId));
  };

  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.symbol) return;
    
    const asset: PortfolioItem = {
      id: `new-${Date.now()}`,
      name: newAsset.name,
      symbol: newAsset.symbol,
      type: newAsset.type as "Stock" | "Mutual Fund" | "Other",
      invested: newAsset.invested || 0,
      currentValue: newAsset.currentValue || 0,
      returns: newAsset.invested
        ? (((newAsset.currentValue || 0) - newAsset.invested) / newAsset.invested) * 100
        : 0,
    };
    setPortfolio((prev) => [...prev, asset]);
    setNewAsset({
      name: "",
      symbol: "",
      type: "Stock",
      invested: 0,
      currentValue: 0,
    });
    setIsAddingNew(false);
  };

  const totalInvested = portfolio.reduce((acc, p) => acc + p.invested, 0);
  const totalValue = portfolio.reduce((acc, p) => acc + p.currentValue, 0);
  const totalGain = totalValue - totalInvested;
  const percentageGain = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Button variant="ghost" asChild className="mb-2 -ml-2">
            <Link href="/admin/users" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Users
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl">
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {userData.name}
              </h1>
              <p className="text-muted-foreground">{userData.email}</p>
            </div>
          </div>
        </div>
        <Button onClick={() => setIsAddingNew(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Asset
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Value
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {formatCurrency(totalValue)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Invested
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {formatCurrency(totalInvested)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Gain/Loss
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalGain >= 0 ? "text-primary" : "text-destructive"}`}>
              {totalGain >= 0 ? "+" : ""}{formatCurrency(totalGain)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {percentageGain >= 0 ? "+" : ""}{percentageGain.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Portfolio Holdings ({portfolio.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Asset
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Invested
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Current Value
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Returns
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((asset) => (
                  <tr key={asset.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-foreground">{asset.name}</div>
                        <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="secondary" className="font-normal">
                        {asset.type}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right text-foreground">
                      {formatCurrency(asset.invested)}
                    </td>
                    <td className="py-4 px-4 text-right text-foreground">
                      {formatCurrency(asset.currentValue)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={asset.returns >= 0 ? "text-primary" : "text-destructive"}>
                        {asset.returns >= 0 ? "+" : ""}{asset.returns.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setEditingAsset(asset)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteAsset(asset.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingAsset} onOpenChange={() => setEditingAsset(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editingAsset?.name}</DialogTitle>
          </DialogHeader>
          {editingAsset && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={editingAsset.name}
                    onChange={(e) =>
                      setEditingAsset({ ...editingAsset, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Symbol</label>
                  <Input
                    value={editingAsset.symbol}
                    onChange={(e) =>
                      setEditingAsset({ ...editingAsset, symbol: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select
                  value={editingAsset.type}
                  onValueChange={(value) =>
                    setEditingAsset({
                      ...editingAsset,
                      type: value as "Stock" | "Mutual Fund" | "Other",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Stock">Stock</SelectItem>
                    <SelectItem value="Mutual Fund">Mutual Fund</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Invested Amount</label>
                  <Input
                    type="number"
                    value={editingAsset.invested}
                    onChange={(e) =>
                      setEditingAsset({
                        ...editingAsset,
                        invested: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Value</label>
                  <Input
                    type="number"
                    value={editingAsset.currentValue}
                    onChange={(e) =>
                      setEditingAsset({
                        ...editingAsset,
                        currentValue: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingAsset(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (editingAsset) {
                  const returns =
                    editingAsset.invested > 0
                      ? ((editingAsset.currentValue - editingAsset.invested) /
                          editingAsset.invested) *
                        100
                      : 0;
                  handleUpdateAsset({ ...editingAsset, returns });
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Dialog */}
      <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  placeholder="e.g., Apple Inc."
                  value={newAsset.name}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Symbol</label>
                <Input
                  placeholder="e.g., AAPL"
                  value={newAsset.symbol}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, symbol: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select
                value={newAsset.type}
                onValueChange={(value) =>
                  setNewAsset({ ...newAsset, type: value as "Stock" | "Mutual Fund" | "Other" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stock">Stock</SelectItem>
                  <SelectItem value="Mutual Fund">Mutual Fund</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Invested Amount</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newAsset.invested || ""}
                  onChange={(e) =>
                    setNewAsset({
                      ...newAsset,
                      invested: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Value</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newAsset.currentValue || ""}
                  onChange={(e) =>
                    setNewAsset({
                      ...newAsset,
                      currentValue: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingNew(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAsset}>Add Asset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
