# AI Chatbot dengan gRPC dan Deepseek API

Aplikasi chatbot yang menggunakan gRPC, Protobuf, dan HTTP/2 untuk komunikasi antara frontend dan backend, dengan integrasi Deepseek API untuk pemrosesan bahasa alami.

## Spesifikasi Teknis

### Teknologi yang Digunakan
- Python 3.11 (Backend)
- Node.js (Frontend UI)
- gRPC (Google Remote Procedure Call)
- Protocol Buffers (Protobuf)
- HTTP/2
- Deepseek API
- Socket.IO (Komunikasi real-time)
- Express.js (Web server)

### Struktur Proyek
```
.
├── chat.proto           # Definisi protobuf
├── chat_pb2.py         # File protobuf yang digenerate
├── chat_pb2_grpc.py    # File gRPC yang digenerate
├── backend_chat.py     # Server gRPC dan integrasi Deepseek API
├── frontend/           # Frontend UI dengan Node.js
│   ├── package.json    # Dependensi Node.js
│   ├── server.js       # Server Express dan Socket.IO
│   └── public/         # File statis
│       ├── index.html  # Halaman web
│       ├── styles.css  # Styling
│       └── app.js      # Logika frontend
├── requirements.txt    # Dependensi Python
└── .env               # Konfigurasi environment
```

### Komponen Utama

1. **Backend (`backend_chat.py`)**
   - Server gRPC
   - Menangani koneksi ke Deepseek API
   - Port default: 50053
   - Thread pool dengan 10 worker

2. **Frontend UI (`frontend/`)**
   - Web interface modern
   - Komunikasi real-time dengan Socket.IO
   - gRPC client untuk backend
   - Responsive design dengan Bootstrap
   - Port default: 8083

## Prasyarat

### Backend
- Python 3.11
- pip (Python package manager)
- Akses ke Deepseek API

### Frontend
- Node.js (versi terbaru)
- npm (Node package manager)
- Port 50053 dan 8083 tersedia

## Instalasi

### Backend
1. Clone repositori
2. Buat virtual environment (opsional):
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

3. Install dependensi Python:
   ```bash
   pip install -r requirements.txt
   ```

4. Generate file protobuf:
   ```bash
   python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. chat.proto
   ```

### Frontend
1. Masuk ke direktori frontend:
   ```bash
   cd frontend
   ```

2. Install dependensi Node.js:
   ```bash
   npm install
   ```

3. Konfigurasi environment:
   - Buat file `.env` di root direktori
   - Isi dengan konfigurasi berikut:
     ```env
     # Konfigurasi API Key
     DEEPSEEK_API_KEY=your_api_key_here

     # Konfigurasi Port
     GRPC_PORT=50053
     HTTP_PORT=8083

     # Konfigurasi Deepseek API
     DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
     DEEPSEEK_MODEL=deepseek-chat

     # Konfigurasi gRPC
     GRPC_MAX_WORKERS=10
     GRPC_MAX_MESSAGE_LENGTH=4194304  # 4MB
     ```

## Cara Menjalankan

### Menggunakan File Batch
1. Jalankan backend server:
   ```bash
   run_backend.bat
   ```

2. Jalankan frontend UI:
   ```bash
   run_frontend_ui.bat
   ```

3. Buka browser dan akses `http://localhost:8083`

### Manual
1. Jalankan backend server:
   ```bash
   python backend_chat.py
   ```

2. Di terminal terpisah, jalankan frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Buka browser dan akses `http://localhost:8083`

## Fitur Frontend UI

- Interface chat yang modern dan responsif
- Komunikasi real-time dengan Socket.IO
- Auto-scroll ke pesan terbaru
- Indikator pesan user dan bot yang berbeda
- Input dengan validasi
- Penanganan error yang baik
- Status koneksi real-time

## Arsitektur Komunikasi

1. Frontend UI mengirim pesan melalui Socket.IO
2. Node.js server menerima pesan dan mengirim ke backend melalui gRPC
3. Backend menerima pesan dan mengirim ke Deepseek API
4. Deepseek API memproses pesan dan mengembalikan response
5. Backend meneruskan response ke Node.js server
6. Node.js server mengirim response ke frontend UI melalui Socket.IO
7. Frontend UI menampilkan response ke pengguna

## Error Handling

- Frontend UI menangani error koneksi Socket.IO
- Node.js server menangani error gRPC
- Backend menangani error API Deepseek
- Semua error ditampilkan dengan pesan yang jelas
- Log error disimpan di console

## Keamanan

- API key disimpan di file .env
- File .env tidak termasuk dalam version control
- Komunikasi gRPC menggunakan insecure channel (untuk development)
- Untuk production, disarankan menggunakan SSL/TLS
- Gunakan environment variables yang aman untuk production

## Catatan Penting

- Pastikan port 50053 dan 8083 tidak digunakan oleh aplikasi lain
- API key Deepseek harus valid
- Untuk production, gunakan environment variables yang aman
- Pastikan Python 3.11 dan Node.js terinstall dengan benar
- File .env harus dibuat secara manual
- Jangan commit file .env ke version control

## Troubleshooting

1. Jika terjadi error koneksi:
   - Pastikan backend server berjalan
   - Periksa port yang digunakan
   - Cek koneksi jaringan
   - Verifikasi konfigurasi di file .env

2. Jika terjadi error API:
   - Periksa API key di file .env
   - Cek quota API
   - Verifikasi format request
   - Pastikan URL API benar

3. Jika terjadi error protobuf:
   - Regenerate file protobuf
   - Periksa versi protobuf
   - Verifikasi definisi proto
   - Pastikan file protobuf digenerate dengan benar

4. Jika terjadi error frontend:
   - Periksa koneksi Node.js server
   - Verifikasi Socket.IO connection
   - Cek console browser untuk error
   - Pastikan semua dependensi terinstall

5. Jika terjadi error environment:
   - Pastikan file .env ada di direktori root
   - Verifikasi format file .env
   - Periksa nilai environment variables
   - Pastikan tidak ada spasi di sekitar tanda sama dengan 