"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Package, ShoppingCart, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  stock?: string;
}

interface Transaction {
  id: number;
  productId: number;
  productName: string;
  customerName: string;
  address: string;
  phone: string;
  quantity: number;
  totalPrice: string;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    address: '',
    phone: '',
    quantity: 1
  });

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      const defaultProducts = [
        {
          id: 1,
          name: "Gas LPG 3kg",
          price: "Rp 25.000",
          description: "Gas LPG ukuran 3kg untuk kebutuhan rumah tangga sehari-hari. Cocok untuk penggunaan rumah tangga kecil hingga menengah.",
          image: "https://images.unsplash.com/photo-1585944672394-4c58a015c1fb?auto=format&fit=crop&q=80&w=500",
          stock: "Tersedia"
        },
        {
          id: 2,
          name: "Gas LPG 12kg",
          price: "Rp 150.000",
          description: "Gas LPG ukuran 12kg untuk kebutuhan bisnis dan rumah tangga. Ideal untuk dapur komersial dan rumah tangga besar.",
          image: "https://images.unsplash.com/photo-1585944672394-4c58a015c1fb?auto=format&fit=crop&q=80&w=500",
          stock: "Tersedia"
        },
        {
          id: 3,
          name: "Gas Industrial",
          price: "Hubungi Kami",
          description: "Gas untuk kebutuhan industri dengan berbagai ukuran. Solusi lengkap untuk kebutuhan gas industri Anda.",
          image: "https://images.unsplash.com/photo-1585944672394-4c58a015c1fb?auto=format&fit=crop&q=80&w=500",
          stock: "Pre-Order"
        }
      ];
      localStorage.setItem('products', JSON.stringify(defaultProducts));
      setProducts(defaultProducts);
    }
  }, []);

  const handleOrder = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleSubmitOrder = () => {
    if (!selectedProduct) return;

    const transactions: Transaction[] = JSON.parse(localStorage.getItem('transactions') || '[]');
    const newTransaction: Transaction = {
      id: Date.now(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      customerName: orderForm.customerName,
      address: orderForm.address,
      phone: orderForm.phone,
      quantity: orderForm.quantity,
      totalPrice: selectedProduct.price === "Hubungi Kami" 
        ? "Akan dikonfirmasi"
        : `Rp ${(parseInt(selectedProduct.price.replace(/\D/g, '')) * orderForm.quantity).toLocaleString('id-ID')}`,
      status: 'pending',
      date: new Date().toISOString()
    };

    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    setIsDialogOpen(false);
    setOrderForm({
      customerName: '',
      address: '',
      phone: '',
      quantity: 1
    });
    alert('Pesanan berhasil dibuat! Tim kami akan segera menghubungi Anda.');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <motion.div 
        className="bg-blue-600 text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Produk Kami
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 max-w-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Pilihan lengkap produk gas berkualitas untuk kebutuhan rumah tangga hingga industri
          </motion.p>
        </div>
      </motion.div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div 
          className="grid md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: Package, title: "Produk Berkualitas", desc: "Standar mutu terjamin" },
            { icon: Truck, title: "Pengiriman Cepat", desc: "Layanan antar 24 jam" },
            { icon: ShoppingCart, title: "Pemesanan Mudah", desc: "Proses order simpel" },
            { icon: Phone, title: "Layanan Responsif", desc: "Dukungan pelanggan 24/7" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-blue-600">
                    {product.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <Badge variant="outline" className="mb-2">
                        {product.stock}
                      </Badge>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{product.price}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <Button 
                    onClick={() => handleOrder(product)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Pesan Sekarang
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Order Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Buat Pesanan</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Nama Lengkap</Label>
              <Input
                id="customerName"
                value={orderForm.customerName}
                onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                placeholder="Masukkan nama lengkap"
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat Pengiriman</Label>
              <Input
                id="address"
                value={orderForm.address}
                onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                placeholder="Masukkan alamat lengkap"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                value={orderForm.phone}
                onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                placeholder="Masukkan nomor telepon"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Jumlah</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={orderForm.quantity}
                onChange={(e) => setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmitOrder} className="bg-blue-600 hover:bg-blue-700">
              Konfirmasi Pesanan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
