"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";

interface ClientMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const messages: ClientMessage[] = JSON.parse(localStorage.getItem('clientMessages') || '[]');
    const newMessage: ClientMessage = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString()
    };
    
    messages.push(newMessage);
    localStorage.setItem('clientMessages', JSON.stringify(messages));
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    
    alert('Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda.');
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Hubungi Kami</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Kirim Pesan</h2>
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama</label>
                <Input 
                  placeholder="Masukkan nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input 
                  type="email" 
                  placeholder="Masukkan email Anda"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nomor Telepon</label>
                <Input 
                  placeholder="Masukkan nomor telepon Anda"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Pesan</label>
                <Textarea 
                  placeholder="Tulis pesan Anda" 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Kirim Pesan</Button>
            </form>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Informasi Kontak</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Alamat</h3>
                  <p className="text-gray-600">
                    Jl H.Mawi Kp. Waru<br />
                    Gg. Serius Rt04/Rw01<br />
                    Parung, Indonesia
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Telepon</h3>
                  <p className="text-gray-600">
                   +62 812 8332 9743 (Rafi Noviandri)<br />
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">info@gaskita.com</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Jam Operasional</h3>
                  <p className="text-gray-600">
                    Senin - Jumat: 08:00 - 17:00<br />
                    Sabtu: 09:00 - 15:00<br />
                    Minggu: Tutup
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}