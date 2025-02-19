"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Search, Mail, Phone, Calendar, Trash2 } from "lucide-react";
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

interface ClientMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export default function AdminClients() {
  const router = useRouter();
  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ClientMessage | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    const storedMessages = localStorage.getItem('clientMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    router.push("/admin/login");
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
      const updatedMessages = messages.filter(message => message.id !== id);
      setMessages(updatedMessages);
      localStorage.setItem('clientMessages', JSON.stringify(updatedMessages));
    }
  };

  const handleViewMessage = (message: ClientMessage) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
  };

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.phone.includes(searchTerm)
  );

  return (
    <div className="py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manajemen Client</h1>
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            className="pl-10"
            placeholder="Cari berdasarkan nama, email, atau nomor telepon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telepon</TableHead>
              <TableHead>Pesan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>
                    {new Date(message.date).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell className="font-medium">{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.phone}</TableCell>
                  <TableCell className="max-w-xs truncate">{message.message}</TableCell>
                  <TableCell className="text-right">
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewMessage(message)}
                      >
                        Lihat Detail
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(message.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  {searchTerm ? "Tidak ada hasil yang ditemukan" : "Belum ada pesan dari client"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detail Pesan Client</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-6">
              <div className="grid grid-cols-[20px,1fr] gap-4 items-start">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Tanggal</p>
                  <p>{new Date(selectedMessage.date).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
              <div className="grid grid-cols-[20px,1fr] gap-4 items-start">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedMessage.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-[20px,1fr] gap-4 items-start">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Telepon</p>
                  <p>{selectedMessage.phone}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Pesan</p>
                <p className="bg-gray-50 p-4 rounded-lg">{selectedMessage.message}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}