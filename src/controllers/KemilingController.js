import axios from "axios";
import { connectionKemiling } from "../config/Database.js";
import {
  filterPendapatanBulanan,
  getCurrentDateArray,
  getTanggalInterval,
} from "../functions/Utils.js";

const port = 5555;
const token = "wFcCXiNy1euYho73dBGwkPhjjTdODzv6";
const namaKlinik = "Klinik Pratama Kosasih Kemiling";
const namaLab = "Laboratorium Kosasih Kemiling";
const bulan = getCurrentDateArray("bulan");
const tahun = getCurrentDateArray("tahun");
const idCabang = [1, 2];

export const getPendapatan = async (req, res) => {
  const idPendapatanBarangKlinik = 401.001;
  const idPendapatanJasaKlinik = 402.001;
  const idPendapatanBarangLab = 401.007;
  const idPendapatanJasaLab = 402.007;

  const queryGetPendapatanBarangKlinik = `
    SELECT SUM(debit - credit) AS balance
    FROM journaltrans
    WHERE approved = 1
      AND DATE(jtdate) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
      AND accountid = '${idPendapatanBarangKlinik}'
      AND division IN ('1');`;

  const queryGetPendapatanJasaKlinik = `
    SELECT SUM(debit - credit) AS balance
    FROM journaltrans
    WHERE approved = 1
      AND DATE(jtdate) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
      AND accountid = '${idPendapatanJasaKlinik}'
      AND division IN ('1');`;

  const queryGetPendapatanBarangLab = `
    SELECT SUM(debit - credit) AS balance
    FROM journaltrans
    WHERE approved = 1
      AND DATE(jtdate) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
      AND accountid = '${idPendapatanBarangLab}'
      AND division IN ('1');`;

  const queryGetPendapatanJasaLab = `
    SELECT SUM(debit - credit) AS balance
    FROM journaltrans
    WHERE approved = 1
      AND DATE(jtdate) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
      AND accountid = '${idPendapatanJasaLab}'
      AND division IN ('1');`;

  try {
    const [resultPendapatanBarangKlinik] = await connectionKemiling.query(
      queryGetPendapatanBarangKlinik
    );
    const [resultPendapatanJasaKlinik] = await connectionKemiling.query(
      queryGetPendapatanJasaKlinik
    );
    const [resultPendapatanBarangLab] = await connectionKemiling.query(
      queryGetPendapatanBarangLab
    );
    const [resultPendapatanJasaLab] = await connectionKemiling.query(
      queryGetPendapatanJasaLab
    );

    const pendapatan = {
      barangKlinik: Math.abs(resultPendapatanBarangKlinik[0].balance) || 0,
      jasaKlinik: Math.abs(resultPendapatanJasaKlinik[0].balance) || 0,
      barangLab: Math.abs(resultPendapatanBarangLab[0].balance) || 0,
      jasaLab: Math.abs(resultPendapatanJasaLab[0].balance) || 0,
    };

    res.json(pendapatan);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

export const indexBulanan = async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: "http://202.157.189.177:8080/api/database/rows/table/663/?user_field_names=true",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const data = response.data.results;

    const dataFiltered = filterPendapatanBulanan(data, [
      `Penjualan ${namaKlinik} ${bulan} ${tahun}`,
      `Penjualan ${namaLab} ${bulan} ${tahun}`,
    ]);
    res.json(dataFiltered);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

export const storeBulanan = async (req, res) => {
  const response = await fetch(`http://localhost:${port}/kemiling/pendapatan`);
  const dataResponse = await response.json();

  const omset = [
    {
      pendapatanBarangKlinik: dataResponse.barangKlinik,
      pendapatanJasaKlinik: dataResponse.jasaKlinik,
    },
    {
      pendapatanBarangLab: dataResponse.barangLab,
      pendapatanJasaLab: dataResponse.jasaLab,
    },
  ];

  const bulan = getCurrentDateArray("bulan");
  const tahun = getCurrentDateArray("tahun");
  const judul = [
    `Penjualan ${namaKlinik} ${bulan} ${tahun}`,
    `Penjualan ${namaLab} ${bulan} ${tahun}`,
  ];

  const intervalBulanIni = getTanggalInterval(bulan, tahun);

  try {
    for (let i = 0; i < omset.length; i++) {
      const data = {
        Judul: judul[i],
        "Id Cabang": [i + 1],
        Tahun: 1,
        Bulan: 1,
        "Tanggal Mulai": intervalBulanIni.tanggalMulai,
        "Tanggal Berakhir": intervalBulanIni.tanggalBerakhir,
        "Target Omset": 0,
        "Total Barang": 0,
        "Total Jasa": 0,
        "Total Omset": "0",
        "Created At": new Date().toISOString(),
      };

      await axios({
        method: "POST",
        url: "http://202.157.189.177:8080/api/database/rows/table/663/?user_field_names=true",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      });
    }

    res.json({
      status: "Berhasil insert data",
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

export const updateBulanan = async (req, res) => {
  try {
    console.log("Hello");
    res.json("BErhasil");
  } catch (error) {
    res.json(error.message);
  }
};

export const storeHarian = async (req, res) => {
  try {
    const responseOmset = await fetch(
      `http://localhost:${port}/kemiling/pendapatan`
    );
    const dataResponseOmset = await responseOmset.json();

    const omset = [
      {
        pendapatanBarangKlinik: dataResponseOmset.barangKlinik,
        pendapatanJasaKlinik: dataResponseOmset.jasaKlinik,
      },
      {
        pendapatanBarangLab: dataResponseOmset.barangLab,
        pendapatanJasaLab: dataResponseOmset.jasaLab,
      },
    ];

    // Fetch bulanan data
    const response = await fetch(
      `http://localhost:${port}/kemiling/pendapatan/bulanan`
    );
    const dataResponse = await response.json();

    if (
      !dataResponse ||
      !Array.isArray(dataResponse) ||
      dataResponse.length < 2
    ) {
      throw new Error("Data bulanan tidak sesuai atau kurang.");
    }

    const idKlinik = dataResponse[0]?.id;
    const idLab = dataResponse[1]?.id;

    if (!idKlinik || !idLab) {
      throw new Error("ID Klinik atau ID Lab tidak ditemukan.");
    }

    const idPenjualanBulanan = [idKlinik, idLab];

    // Memastikan jumlah elemen di idCabang dan idPenjualanBulanan sama
    if (idCabang.length !== idPenjualanBulanan.length) {
      throw new Error(
        "Jumlah elemen di idCabang dan idPenjualanBulanan harus sama."
      );
    }

    // Menggunakan Promise.all untuk menunggu semua permintaan selesai
    const postPromises = idCabang.map((cabangId, index) => {
      const penjualanBarang =
        omset[index].pendapatanBarangKlinik || omset[index].pendapatanBarangLab;
      const penjualanJasa =
        omset[index].pendapatanJasaKlinik || omset[index].pendapatanJasaLab;
      const totalOmset = penjualanBarang + penjualanJasa;

      const dataToSend = {
        Id: `Penjualan Harian Kemiling`,
        "Id Cabang": cabangId,
        "Id Penjualan Bulanan": idPenjualanBulanan[index],
        "Dari Tanggal": "2024-07-24",
        "Sampai Tanggal": "2024-07-24",
        "Penjualan Barang": penjualanBarang.toString(),
        "Penjualan Jasa": penjualanJasa.toString(),
        Diskon: "0",
        Omset: totalOmset,
        "Created At": new Date().toISOString(),
      };

      console.log("Data yang dikirim:", dataToSend);

      return axios({
        method: "POST",
        url: "http://202.157.189.177:8080/api/database/rows/table/665/?user_field_names=true",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        data: dataToSend,
      });
    });

    await Promise.all(postPromises);

    res.status(200).json({ message: "Data berhasil disimpan." });
  } catch (error) {
    console.error("Error storing data:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const run = async (req, res) => {
  try {
    const response = await fetch(
      `http://localhost:${port}/kemiling/pendapatan/bulanan`
    );
    const dataResponse = await response.json();

    if (Array.isArray(dataResponse) && dataResponse.length === 0) {
      await fetch(`http://localhost:${port}/kemiling/pendapatan/bulanan/store`);
    }

    await fetch(`http://localhost:${port}/kemiling/pendapatan/harian/store`);

    await fetch(`http://localhost:${port}/kemiling/pendapatan/bulanan/update`);

    res.json("Berhasil");
  } catch (error) {
    res.json(error.message);
  }
};

// NB:
/*
Tolong perbaiki penjumlahannya, untuk logic alurnya sudah berhasil sih, jadi ga ada kendala
yang kendala cuman waktu aja sih,

*/
