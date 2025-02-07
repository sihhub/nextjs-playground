export function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browserName = "Unknown";
  let fullVersion = "Unknown";
  let majorVersion = "Unknown";

  console.log(ua);

  if (/chrome|chromium|crios/i.test(ua) && !/edg|opr|samsung/i.test(ua)) {
    if (/android/i.test(ua)) {
      browserName = "Chrome Android";
    } else {
      browserName = "Chrome";
    }
    fullVersion = ua.match(/Chrom(?:e|ium)\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (/edg/i.test(ua)) {
    browserName = "Edge";
    fullVersion = ua.match(/Edg\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (/firefox|fxios/i.test(ua)) {
    if (/android/i.test(ua)) {
      browserName = "Firefox for Android";
    } else {
      browserName = "Firefox";
    }
    fullVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (/opr|opera/i.test(ua)) {
    if (/android/i.test(ua)) {
      browserName = "Opera Android";
    } else {
      browserName = "Opera";
    }
    fullVersion = ua.match(/OPR\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (/safari/i.test(ua) && !/chrome|crios|opr|edg/i.test(ua)) {
    if (/iphone|ipad|ipod/i.test(ua)) {
      browserName = "Safari on iOS";
    } else {
      browserName = "Safari";
    }
    fullVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (/samsungbrowser/i.test(ua)) {
    browserName = "Samsung Internet";
    fullVersion = ua.match(/SamsungBrowser\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (/wv|android.*version/i.test(ua) && /chrome/i.test(ua)) {
    browserName = "WebView Android";
    fullVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (
    /iphone|ipad|ipod/i.test(ua) &&
    /AppleWebKit/i.test(ua) &&
    !/safari/i.test(ua)
  ) {
    browserName = "WebView on iOS";
    fullVersion = "Unknown"; // iOS WebView는 버전을 제공하지 않음
  }

  majorVersion = fullVersion.split(".")[0];

  return { browserName, fullVersion, majorVersion: parseInt(majorVersion, 10) };
}
