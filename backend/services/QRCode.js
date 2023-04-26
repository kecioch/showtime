const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const util = require("util");

const createQRCodeFile = async (text) => {
  const toFileSync = util.promisify(QRCode.toFile);

  const staticDir = "./static";
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir);
  }
  const uniqueFilename = "ticket_" + Date.now() + ".png";
  const filepath = path.join(staticDir, uniqueFilename);

  await toFileSync(filepath, text, {
    errorCorrectionLevel: "H",
  });

  return { filename: uniqueFilename, filepath };
};

const createQRCodeSVG = (text) => {
  return QRCode.toString(
    text,
    {
      errorCorrectionLevel: "H",
      type: "svg",
    },
    function (err, data) {
      if (err) throw err;
      return data;
      //   console.log(data);
    }
  );
};

module.exports = { createQRCodeSVG, createQRCodeFile };
