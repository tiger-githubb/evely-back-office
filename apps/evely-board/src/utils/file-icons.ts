import aiIcon from '@public/file-icons/ai.png';
import apkIcon from '@public/file-icons/apk.png';
import codeIcon from '@public/file-icons/code.png';
import docIcon from '@public/file-icons/doc.png';
import folderIcon from '@public/file-icons/folder.png';
import fontIcon from '@public/file-icons/font.png';
import otherIcon from '@public/file-icons/icon-other.png';
import imgIcon from '@public/file-icons/img.png';
import isoIcon from '@public/file-icons/iso.png';
import jsIcon from '@public/file-icons/js.png';
import mp3Icon from '@public/file-icons/mp3.png';
import mp4Icon from '@public/file-icons/mp4.png';
import pdfIcon from '@public/file-icons/pdf.png';
import phpIcon from '@public/file-icons/php.png';
import pptIcon from '@public/file-icons/ppt.png';
import psIcon from '@public/file-icons/ps.png';
import sqlIcon from '@public/file-icons/sql.png';
import svgIcon from '@public/file-icons/svg.png';
import txtIcon from '@public/file-icons/txt.png';
import xlsIcon from '@public/file-icons/xls.png';
import zipIcon from '@public/file-icons/zip.png';

export function getFileIcon(extension: string | null) {
  if (!extension) return folderIcon;

  const ext = extension.startsWith('.')
    ? extension.slice(1).toLowerCase()
    : extension.toLowerCase();

  switch (ext) {
    case 'doc':
    case 'docx':
      return docIcon;
    case 'pdf':
      return pdfIcon;
    case 'xls':
    case 'xlsx':
      return xlsIcon;
    case 'ppt':
    case 'pptx':
      return pptIcon;
    case 'txt':
      return txtIcon;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
      return imgIcon;
    case 'svg':
      return svgIcon;
    case 'ai':
    case 'eps':
      return aiIcon;
    case 'psd':
      return psIcon;
    case 'mp3':
    case 'wav':
      return mp3Icon;
    case 'mp4':
    case 'mov':
    case 'avi':
      return mp4Icon;
    case 'iso':
      return isoIcon;
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
      return jsIcon;
    case 'php':
      return phpIcon;
    case 'sql':
      return sqlIcon;
    case 'html':
    case 'css':
    case 'java':
    case 'py':
    case 'rb':
      return codeIcon;
    case 'ttf':
    case 'otf':
    case 'woff':
    case 'woff2':
      return fontIcon;
    case 'zip':
    case 'rar':
    case '7z':
      return zipIcon;
    case 'apk':
      return apkIcon;
    default:
      return otherIcon;
  }
}
