import React, { useState, useRef, useEffect } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { 
  Link, Type, Wifi, Contact, Download, Settings2, X, Upload, 
  MessageCircle, Mail, Bitcoin, Plus, Minus, ChevronRight, ChevronLeft
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function QrGenerator() {
  const [activeTab, setActiveTab] = useState('url');
  
  const tabsContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const amount = direction === 'left' ? -200 : 200;
      tabsContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  
  // Data States
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [wifi, setWifi] = useState({ ssid: '', password: '', encryption: 'WPA' });
  const [vcard, setVcard] = useState({ name: '', phone: '', email: '', company: '' });
  
  // New Feature 1 States
  const [whatsapp, setWhatsapp] = useState({ phone: '', message: '' });
  const [email, setEmail] = useState({ to: '', subject: '', body: '' });
  const [crypto, setCrypto] = useState({ address: '', coin: 'bitcoin' });

  // UTM States (Feature 2)
  const [showUtm, setShowUtm] = useState(false);
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');

  // Customization States (Feature 3)
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logo, setLogo] = useState(null);
  const [qrStyle, setQrStyle] = useState('squares'); // 'squares' or 'dots'
  const [eyeRadius, setEyeRadius] = useState(0); // 0 to 10

  // Export States (Feature 4)
  const [addFrame, setAddFrame] = useState(false);
  const [frameText, setFrameText] = useState('SCAN ME');

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => setLogo(null);

  const getUrlWithUtm = () => {
    let finalUrl = url.trim() || 'https://example.com';
    if (showUtm && (utmSource || utmMedium || utmCampaign)) {
      try {
        const urlObj = new URL(finalUrl.startsWith('http') ? finalUrl : `https://${finalUrl}`);
        if (utmSource) urlObj.searchParams.set('utm_source', utmSource);
        if (utmMedium) urlObj.searchParams.set('utm_medium', utmMedium);
        if (utmCampaign) urlObj.searchParams.set('utm_campaign', utmCampaign);
        return urlObj.toString();
      } catch (e) {
        return finalUrl; // Fallback if invalid URL
      }
    }
    return finalUrl;
  };

  const getQrValue = () => {
    switch (activeTab) {
      case 'url':
        return getUrlWithUtm();
      case 'text':
        return text.trim() || 'Your text here';
      case 'wifi':
        return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcard.name}\nORG:${vcard.company}\nTEL:${vcard.phone}\nEMAIL:${vcard.email}\nEND:VCARD`;
      case 'whatsapp':
        return `wa.me/${whatsapp.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsapp.message)}`;
      case 'email':
        return `mailto:${email.to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
      case 'crypto':
        return `${crypto.coin}:${crypto.address}`;
      default:
        return 'https://example.com';
    }
  };

  const triggerDownload = (dataUrl, filename) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPNG = () => {
    // react-qrcode-logo renders the canvas with the ID we provide
    const canvas = document.getElementById('qr-canvas');
    if (!canvas) return;

    if (addFrame) {
      // Feature 4: "Scan Me" CTA Export Frame
      const scale = 2; // High resolution scale factor
      const padding = 40 * scale;
      const textSpace = 80 * scale;
      
      const offCanvas = document.createElement('canvas');
      const ctx = offCanvas.getContext('2d');
      
      const originalSize = canvas.width;
      
      offCanvas.width = originalSize + (padding * 2);
      offCanvas.height = originalSize + padding + textSpace;
      
      // Draw background frame
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, offCanvas.width, offCanvas.height);
      
      // Draw border
      ctx.strokeStyle = fgColor;
      ctx.lineWidth = 10 * scale;
      ctx.strokeRect(0, 0, offCanvas.width, offCanvas.height);
      
      // Draw original QR code inside
      ctx.drawImage(canvas, padding, padding, originalSize, originalSize);
      
      // Draw CTA text
      ctx.fillStyle = fgColor;
      ctx.font = `bold ${40 * scale}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(frameText || 'SCAN ME', offCanvas.width / 2, offCanvas.height - (textSpace / 2));
      
      triggerDownload(offCanvas.toDataURL('image/png'), 'framed-qrcode.png');
    } else {
      triggerDownload(canvas.toDataURL('image/png'), 'qrcode.png');
    }
  };

  const tabs = [
    { id: 'url', label: 'URL', icon: Link },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { id: 'vcard', label: 'vCard', icon: Contact },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'crypto', label: 'Crypto', icon: Bitcoin },
  ];

  return (
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Column - Inputs */}
      <div class="lg:col-span-8 space-y-6">
        
        {/* Horizontal Scrollable Tabs to handle all 7 templates cleanly */}
        <div class="relative w-full group">
          
          {/* Left Arrow Button */}
          <button 
            onClick={() => scrollTabs('left')}
            class={cn(
              "absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/90 to-transparent z-10 flex items-center justify-start pl-1 rounded-l-2xl transition-opacity duration-300",
              showLeftArrow ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft class="w-5 h-5 text-slate-500 hover:text-indigo-600 transition-colors" />
          </button>

          <div 
            ref={tabsContainerRef}
            onScroll={handleScroll}
            class="bg-white rounded-2xl shadow-md p-2 flex overflow-x-auto no-scrollbar gap-1 relative z-0"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  class={cn(
                    "flex-shrink-0 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-200",
                    isActive 
                      ? "bg-indigo-50 text-indigo-700 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <Icon class="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          
          {/* Right Arrow Button */}
          <button 
            onClick={() => scrollTabs('right')}
            class={cn(
              "absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/90 to-transparent z-10 flex items-center justify-end pr-1 rounded-r-2xl transition-opacity duration-300",
              showRightArrow ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight class="w-5 h-5 text-slate-500 hover:text-indigo-600 transition-colors" />
          </button>
        </div>

        {/* Input Forms */}
        <div class="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-slate-100 transition-all">
          {activeTab === 'url' && (
            <div class="space-y-6">
              <div class="space-y-4">
                <label htmlFor="url-input" class="block text-sm font-semibold text-slate-900">Website URL</label>
                <input
                  id="url-input"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800"
                />
              </div>

              {/* Feature 2: UTM Builder Accordion */}
              <div class="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setShowUtm(!showUtm)}
                  class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-sm font-semibold text-slate-700"
                >
                  <span class="flex items-center gap-2">Campaign Tracking (UTM)</span>
                  {showUtm ? <Minus class="w-4 h-4" /> : <Plus class="w-4 h-4" />}
                </button>
                
                {showUtm && (
                  <div class="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border-t border-slate-200">
                    <div class="space-y-2">
                      <label htmlFor="utm-source" class="block text-xs font-semibold text-slate-700">Source (utm_source)</label>
                      <input
                        id="utm-source"
                        type="text"
                        value={utmSource}
                        onChange={(e) => setUtmSource(e.target.value)}
                        placeholder="google, newsletter"
                        class="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-indigo-600 outline-none"
                      />
                    </div>
                    <div class="space-y-2">
                      <label htmlFor="utm-medium" class="block text-xs font-semibold text-slate-700">Medium (utm_medium)</label>
                      <input
                        id="utm-medium"
                        type="text"
                        value={utmMedium}
                        onChange={(e) => setUtmMedium(e.target.value)}
                        placeholder="cpc, email"
                        class="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-indigo-600 outline-none"
                      />
                    </div>
                    <div class="space-y-2">
                      <label htmlFor="utm-campaign" class="block text-xs font-semibold text-slate-700">Campaign (utm_campaign)</label>
                      <input
                        id="utm-campaign"
                        type="text"
                        value={utmCampaign}
                        onChange={(e) => setUtmCampaign(e.target.value)}
                        placeholder="summer_sale"
                        class="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-indigo-600 outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div class="space-y-4">
              <label htmlFor="text-input" class="block text-sm font-semibold text-slate-900">Your Text</label>
              <textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the text you want to encode..."
                rows={4}
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 resize-none"
              />
            </div>
          )}

          {activeTab === 'wifi' && (
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2 sm:col-span-2">
                <label htmlFor="wifi-ssid" class="block text-sm font-semibold text-slate-900">Network Name (SSID)</label>
                <input
                  id="wifi-ssid"
                  type="text"
                  value={wifi.ssid}
                  onChange={(e) => setWifi({...wifi, ssid: e.target.value})}
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label htmlFor="wifi-password" class="block text-sm font-semibold text-slate-900">Password</label>
                <input
                  id="wifi-password"
                  type="password"
                  value={wifi.password}
                  onChange={(e) => setWifi({...wifi, password: e.target.value})}
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label htmlFor="wifi-encryption" class="block text-sm font-semibold text-slate-900">Encryption</label>
                <select
                  id="wifi-encryption"
                  value={wifi.encryption}
                  onChange={(e) => setWifi({...wifi, encryption: e.target.value})}
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all bg-white"
                >
                  <option value="WPA">WPA/WPA2/WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'vcard' && (
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label htmlFor="vcard-name" class="block text-sm font-semibold text-slate-900">Full Name</label>
                <input
                  id="vcard-name"
                  type="text"
                  value={vcard.name}
                  onChange={(e) => setVcard({...vcard, name: e.target.value})}
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label htmlFor="vcard-company" class="block text-sm font-semibold text-slate-900">Company</label>
                <input
                  id="vcard-company"
                  type="text"
                  value={vcard.company}
                  onChange={(e) => setVcard({...vcard, company: e.target.value})}
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label htmlFor="vcard-phone" class="block text-sm font-semibold text-slate-900">Phone</label>
                <input
                  id="vcard-phone"
                  type="tel"
                  value={vcard.phone}
                  onChange={(e) => setVcard({...vcard, phone: e.target.value})}
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label htmlFor="vcard-email" class="block text-sm font-semibold text-slate-900">Email</label>
                <input
                  id="vcard-email"
                  type="email"
                  value={vcard.email}
                  onChange={(e) => setVcard({...vcard, email: e.target.value})}
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Feature 1: Social & Apps Forms */}
          {activeTab === 'whatsapp' && (
            <div class="space-y-4">
              <div class="space-y-2">
                <label htmlFor="wa-phone" class="block text-sm font-semibold text-slate-900">Phone Number (with Country Code)</label>
                <input
                  id="wa-phone"
                  type="tel"
                  value={whatsapp.phone}
                  onChange={(e) => setWhatsapp({...whatsapp, phone: e.target.value})}
                  placeholder="+1234567890"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label htmlFor="wa-msg" class="block text-sm font-semibold text-slate-900">Prefilled Message</label>
                <textarea
                  id="wa-msg"
                  value={whatsapp.message}
                  onChange={(e) => setWhatsapp({...whatsapp, message: e.target.value})}
                  placeholder="Hello, I'm interested in..."
                  rows={3}
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div class="grid grid-cols-1 gap-4">
              <div class="space-y-2">
                <label htmlFor="email-to" class="block text-sm font-semibold text-slate-900">To Email</label>
                <input
                  id="email-to"
                  type="email"
                  value={email.to}
                  onChange={(e) => setEmail({...email, to: e.target.value})}
                  placeholder="contact@example.com"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label htmlFor="email-subject" class="block text-sm font-semibold text-slate-900">Subject</label>
                <input
                  id="email-subject"
                  type="text"
                  value={email.subject}
                  onChange={(e) => setEmail({...email, subject: e.target.value})}
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label htmlFor="email-body" class="block text-sm font-semibold text-slate-900">Body</label>
                <textarea
                  id="email-body"
                  value={email.body}
                  onChange={(e) => setEmail({...email, body: e.target.value})}
                  rows={3}
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'crypto' && (
            <div class="space-y-4">
              <div class="space-y-2">
                <label htmlFor="crypto-coin" class="block text-sm font-semibold text-slate-900">Cryptocurrency</label>
                <select
                  id="crypto-coin"
                  value={crypto.coin}
                  onChange={(e) => setCrypto({...crypto, coin: e.target.value})}
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all bg-white"
                >
                  <option value="bitcoin">Bitcoin (BTC)</option>
                  <option value="ethereum">Ethereum (ETH)</option>
                  <option value="litecoin">Litecoin (LTC)</option>
                </select>
              </div>
              <div class="space-y-2">
                <label htmlFor="crypto-address" class="block text-sm font-semibold text-slate-900">Wallet Address</label>
                <input
                  id="crypto-address"
                  type="text"
                  value={crypto.address}
                  onChange={(e) => setCrypto({...crypto, address: e.target.value})}
                  placeholder="Enter wallet address"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Customization Area */}
        <div class="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-slate-100">
          <div class="flex items-center gap-2 mb-6">
            <Settings2 class="w-5 h-5 text-indigo-600" />
            <h3 class="text-lg font-bold text-slate-900">Customization</h3>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Colors */}
            <div class="space-y-4">
              <label class="block text-sm font-semibold text-slate-900">Colors</label>
              <div class="flex items-center gap-4">
                <div class="flex flex-col gap-1 items-center">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    class="w-10 h-10 rounded cursor-pointer border-0 p-0"
                    title="Foreground Color"
                  />
                  <span class="text-xs text-slate-500 font-medium">Code</span>
                </div>
                <div class="flex flex-col gap-1 items-center">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    class="w-10 h-10 rounded cursor-pointer border-0 p-0"
                    title="Background Color"
                  />
                  <span class="text-xs text-slate-500 font-medium">BG</span>
                </div>
              </div>
            </div>

            {/* Feature 3: Modern QR Styles */}
            <div class="space-y-4">
              <label htmlFor="style-shape" class="block text-sm font-semibold text-slate-900">Shape & Style</label>
              <div class="flex flex-col gap-3">
                <select
                  id="style-shape"
                  value={qrStyle}
                  onChange={(e) => setQrStyle(e.target.value)}
                  class="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-indigo-600 outline-none"
                >
                  <option value="squares">Square Modules</option>
                  <option value="dots">Dot Modules</option>
                </select>
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-slate-500 font-medium"><label htmlFor="style-radius">Eye Roundness ({eyeRadius})</label></span>
                  <input 
                    id="style-radius"
                    type="range" 
                    min="0" max="20" 
                    value={eyeRadius} 
                    onChange={(e) => setEyeRadius(Number(e.target.value))} 
                    class="w-full accent-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div class="space-y-4">
              <label class="block text-sm font-semibold text-slate-900">Center Logo</label>
              {!logo ? (
                <div>
                  <label class="flex items-center justify-center gap-2 px-3 py-3 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors group">
                    <Upload class="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                    <span class="text-xs font-medium text-slate-600 group-hover:text-indigo-600">Upload Logo</span>
                    <input type="file" accept="image/*" class="hidden" onChange={handleLogoUpload} />
                  </label>
                </div>
              ) : (
                <div class="flex items-center justify-between p-2 border border-slate-200 rounded-xl bg-slate-50">
                  <div class="flex items-center gap-2">
                    <img src={logo} alt="Logo" class="w-6 h-6 object-contain rounded" />
                    <span class="text-xs font-medium text-slate-700">Added</span>
                  </div>
                  <button onClick={removeLogo} class="p-1 text-slate-400 hover:text-red-500 transition-colors">
                    <X class="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Right Column - Preview & Download */}
      <div class="lg:col-span-4 sticky top-6">
        <div class="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-slate-100 flex flex-col items-center">
          <h3 class="text-lg font-bold text-slate-900 w-full mb-6 text-center">Live Preview</h3>
          
          <div class="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6 w-full max-w-[280px] aspect-square flex items-center justify-center shadow-inner relative overflow-hidden">
            <div class="w-full h-full flex justify-center items-center">
              <QRCode 
                id="qr-canvas"
                value={getQrValue()}
                size={1024}
                style={{ width: '100%', height: '100%' }}
                bgColor={bgColor}
                fgColor={fgColor}
                qrStyle={qrStyle}
                eyeRadius={[eyeRadius, eyeRadius, eyeRadius, eyeRadius]} // Applies radius to all corners of all eyes
                logoImage={logo}
                logoWidth={250}
                logoHeight={250}
                removeQrCodeBehindLogo={true}
                logoPadding={10}
                ecLevel="H"
              />
            </div>
          </div>

          {/* Feature 4: Scan Me CTA Frame Options */}
          <div class="w-full mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <label class="flex items-center gap-3 cursor-pointer mb-3">
              <input 
                type="checkbox" 
                checked={addFrame} 
                onChange={(e) => setAddFrame(e.target.checked)}
                class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span class="text-sm font-semibold text-slate-900">Add "Scan Me" Frame</span>
            </label>
            {addFrame && (
              <input
                type="text"
                value={frameText}
                onChange={(e) => setFrameText(e.target.value)}
                placeholder="SCAN ME"
                class="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-indigo-600 outline-none"
              />
            )}
          </div>

          <div class="flex flex-col w-full gap-3">
            <button
              onClick={downloadPNG}
              class="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              <Download class="w-5 h-5" />
              Download High-Res PNG
            </button>
          </div>
          
          <p class="text-xs text-center text-slate-500 mt-4">
            Commercial use allowed. No expiration.
          </p>
        </div>
      </div>
    </div>
  );
}
