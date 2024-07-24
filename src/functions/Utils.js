export const filterPendapatanBulanan = (dataArray, judulArray) => {
  if (!Array.isArray(dataArray) || !Array.isArray(judulArray)) {
    throw new Error("Parameter harus berupa array.");
  }

  const lowerCaseJudulArray = judulArray.map((judul) => judul.toLowerCase());

  return dataArray.filter((item) =>
    lowerCaseJudulArray.includes(item.Judul.toLowerCase())
  );
};

export const getCurrentDateArray = (parameter = null) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const today = new Date();
  const date = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  switch (parameter) {
    case "tanggal":
      return date.toString();
    case "bulan":
      return month;
    case "tahun":
      return year.toString();
    default:
      return [date.toString(), month, year.toString()];
  }
};

export const getTanggalInterval = (bulan, tahun) => {
  const bulanMap = {
    Januari: 1,
    Februari: 2,
    Maret: 3,
    April: 4,
    Mei: 5,
    Juni: 6,
    Juli: 7,
    Agustus: 8,
    September: 9,
    Oktober: 10,
    November: 11,
    Desember: 12,
  };
  const month = bulanMap[bulan];
  const year = parseInt(tahun);

  if (!month || isNaN(year)) {
    throw new Error("Bulan atau tahun tidak valid");
  }
  const tanggalMulai = new Date(year, month - 1, 1);
  const tanggalBerakhir = new Date(year, month, 0);

  const formatTanggal = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return {
    tanggalMulai: formatTanggal(tanggalMulai),
    tanggalBerakhir: formatTanggal(tanggalBerakhir),
  };
};
