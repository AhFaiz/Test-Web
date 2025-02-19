"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    router.push("/admin/login");
  };

  const handleAddEdit = (product: Product | null) => {
    setIsEditing(true);
    setCurrentProduct(product || {
      id: Date.now(),
      name: "",
      price: "",
      description: "",
      image: ""
    } as Product);
  };

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct) {
      let updatedProducts;
      if (products.find(p => p.id === currentProduct.id)) {
        updatedProducts = products.map(p => p.id === currentProduct.id ? currentProduct : p);
      } else {
        updatedProducts = [...products, currentProduct];
      }
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setIsEditing(false);
      setCurrentProduct(null);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manajemen Produk</h1>
        <div className="space-x-4">
          <Button onClick={() => handleAddEdit(null)}>
            <Plus className="mr-2 h-4 w-4" /> Tambah Produk
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gambar</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                <TableCell className="text-right">
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleAddEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentProduct?.id ? 'Edit Produk' : 'Tambah Produk'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nama Produk</label>
              <Input
                value={currentProduct?.name}
                onChange={(e) => setCurrentProduct(curr => curr ? {...curr, name: e.target.value} : null)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Harga</label>
              <Input
                value={currentProduct?.price}
                onChange={(e) => setCurrentProduct(curr => curr ? {...curr, price: e.target.value} : null)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Deskripsi</label>
              <Textarea
                value={currentProduct?.description}
                onChange={(e) => setCurrentProduct(curr => curr ? {...curr, description: e.target.value} : null)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL Gambar</label>
              <Input
                value={currentProduct?.image}
                onChange={(e) => setCurrentProduct(curr => curr ? {...curr, image: e.target.value} : null)}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}