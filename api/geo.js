export default async function handler(req, res) {
    try {
        // Userning IP manzilini olish
        const ip =
            req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Tashqi geo API orqali tilni olish
        const geo = await fetch(`https://ipapi.co/${ip}/json/`).then((r) => r.json());

        const lang = geo.languages ? geo.languages.split(',')[0] : 'en';

        res.status(200).json({
            ip: ip,
            country: geo.country_code || 'US',
            lang: lang || 'en',
        });
    } catch (err) {
        res.status(200).json({
            ip: null,
            country: 'US',
            lang: 'en',
        });
    }
}
