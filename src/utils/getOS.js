function getOS() {
    const userAgent = navigator.userAgent;

    if (/Windows NT 10\.0/.test(userAgent)) return "Windows 10";
    if (/Windows NT 6\.3/.test(userAgent)) return "Windows 8.1";
    if (/Windows NT 6\.2/.test(userAgent)) return "Windows 8";
    if (/Windows NT 6\.1/.test(userAgent)) return "Windows 7";
    if (/Macintosh/.test(userAgent)) return "macOS";
    if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";
    if (/Android/.test(userAgent)) return "Android";
    if (/Linux/.test(userAgent)) return "Linux";

    return "Unknown";
}

export default getOS;