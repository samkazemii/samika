(() => {
  const translations = {
    "سامیکا | Samika — دورهمی آنلاین": { en: "Samika | Online Hangout", tr: "Samika | Çevrimiçi Buluşma", ar: "ساميكا | لقاء عبر الإنترنت", fr: "Samika | Salon en ligne" },
    "سامیکا": { en: "Samika", tr: "Samika", ar: "ساميكا", fr: "Samika" },
    "امکانات": { en: "Features", tr: "Özellikler", ar: "المزايا", fr: "Fonctionnalités" },
    "اتاق‌ها": { en: "Rooms", tr: "Odalar", ar: "الغرف", fr: "Salons" },
    "چطور کار می‌کند؟": { en: "How it works", tr: "Nasıl çalışır?", ar: "كيف يعمل؟", fr: "Comment ça marche ?" },
    "پرسش‌ها": { en: "FAQ", tr: "SSS", ar: "الأسئلة الشائعة", fr: "FAQ" },
    "ورود به اتاق": { en: "Join a room", tr: "Odaya katıl", ar: "انضم إلى غرفة", fr: "Rejoindre un salon" },
    "ساخت اتاق رایگان": { en: "Create a free room", tr: "Ücretsiz oda oluştur", ar: "أنشئ غرفة مجانية", fr: "Créer un salon gratuit" },
    "دورهمی، هرجا که هستید": { en: "Together, wherever you are", tr: "Nerede olursan ol, birlikte", ar: "معًا أينما كنتم", fr: "Ensemble, où que vous soyez" },
    "فاصله‌ها را کم کن،": { en: "Bring everyone closer,", tr: "Herkesi yakınlaştır,", ar: "قرّب المسافات،", fr: "Rapprochez-vous," },
    "یک اتاق بساز.": { en: "make a room.", tr: "bir oda oluştur.", ar: "وأنشئ غرفة.", fr: "créez un salon." },
    "فیلم ببینید، بازی کنید و گپ بزنید؛ همه در یک پاتوق آنلاین که با یک لینک، دوستانتان را دور هم جمع می‌کند.": { en: "Watch videos, play games, and chat in one online hangout. One link brings your friends together.", tr: "Tek bir çevrimiçi buluşma alanında video izleyin, oyun oynayın ve sohbet edin. Tek bağlantıyla arkadaşlarınızı bir araya getirin.", ar: "شاهدوا الفيديوهات والعبوا وتحدثوا في مساحة واحدة عبر الإنترنت. رابط واحد يجمع أصدقاءكم.", fr: "Regardez des vidéos, jouez et discutez dans un même espace en ligne. Un lien suffit pour réunir vos amis." },
    "اتاق خودم را بساز": { en: "Create my room", tr: "Odamı oluştur", ar: "أنشئ غرفتي", fr: "Créer mon salon" },
    "دیدن اتاق‌های عمومی": { en: "Browse public rooms", tr: "Herkese açık odalara bak", ar: "تصفّح الغرف العامة", fr: "Voir les salons publics" },
    "رایگان برای شروع": { en: "Free to get started", tr: "Başlamak ücretsiz", ar: "ابدأ مجانًا", fr: "Gratuit pour commencer" },
    "بدون نصب برنامه": { en: "No app to install", tr: "Uygulama yüklemeden", ar: "من دون تثبيت تطبيق", fr: "Sans installer d’application" },
    "تماشای هم‌زمان": { en: "Watch together", tr: "Birlikte izleyin", ar: "شاهدوا معًا", fr: "Regarder ensemble" },
    "یک قاب برای همه": { en: "One screen for everyone", tr: "Herkes için tek ekran", ar: "شاشة واحدة للجميع", fr: "Un écran pour tout le monde" },
    "اتاق خصوصی": { en: "Private rooms", tr: "Özel odalar", ar: "غرف خاصة", fr: "Salons privés" },
    "فقط با لینک دعوت": { en: "Invite link only", tr: "Yalnızca davet bağlantısıyla", ar: "برابط دعوة فقط", fr: "Avec un lien d’invitation" },
    "بازی گروهی": { en: "Group games", tr: "Grup oyunları", ar: "ألعاب جماعية", fr: "Jeux en groupe" },
    "همین‌جا در مرورگر": { en: "Right in your browser", tr: "Doğrudan tarayıcında", ar: "مباشرةً في المتصفح", fr: "Directement dans le navigateur" },
    "اتاق فیلم جمعه‌شب": { en: "Friday movie room", tr: "Cuma filmi odası", ar: "غرفة فيلم ليلة الجمعة", fr: "Soirée cinéma du vendredi" },
    "۴ نفر آنلاین": { en: "4 people online", tr: "4 kişi çevrimiçi", ar: "٤ أشخاص متصلون", fr: "4 personnes en ligne" },
    "شبِ فیلم و پاپ‌کورن 🍿": { en: "Movie night and popcorn 🍿", tr: "Film ve patlamış mısır 🍿", ar: "ليلة فيلم وفشار 🍿", fr: "Film et pop-corn 🍿" },
    "همه دارن با هم تماشا می‌کنن": { en: "Everyone is watching together", tr: "Herkes birlikte izliyor", ar: "الجميع يشاهد معًا", fr: "Tout le monde regarde ensemble" },
    "همه‌چیز برای یک شب خوب آماده‌ست": { en: "Everything is ready for a great night", tr: "Güzel bir gece için her şey hazır", ar: "كل شيء جاهز لأمسية جميلة", fr: "Tout est prêt pour une belle soirée" },
    "صدای دورهمی": { en: "Hangout audio", tr: "Buluşma sesi", ar: "صوت اللقاء", fr: "Le son du salon" },
    "روشن و آمادهٔ گپ": { en: "On and ready to chat", tr: "Açık, sohbete hazır", ar: "مفعّل وجاهز للدردشة", fr: "Activé, prêt à discuter" },
    "همه‌چیز یک‌جا": { en: "Everything in one place", tr: "Her şey tek yerde", ar: "كل شيء في مكان واحد", fr: "Tout au même endroit" },
    "برای باهم‌بودن، بهانه کم نمی‌آریم": { en: "More ways to spend time together", tr: "Birlikte vakit geçirmek için daha çok neden", ar: "المزيد من الطرق لقضاء الوقت معًا", fr: "Plus de façons de se retrouver" },
    "یک لینک بفرست و همان‌جا هر کاری دلتان می‌خواهد انجام دهید.": { en: "Share one link and do what you like together.", tr: "Tek bir bağlantı gönderin, birlikte dilediğinizi yapın.", ar: "أرسلوا رابطًا واحدًا وافعلوا معًا ما تحبون.", fr: "Partagez un lien et faites ensemble ce qui vous plaît." },
    "تماشای دسته‌جمعی": { en: "Watch together", tr: "Birlikte izleyin", ar: "مشاهدة جماعية", fr: "Regarder ensemble" },
    "ویدئو یا صفحه‌ات را بیاورید و هم‌زمان با هم تماشا کنید.": { en: "Share a video or your screen and watch at the same time.", tr: "Bir video ya da ekranını paylaş, aynı anda birlikte izle.", ar: "شاركوا فيديو أو شاشة جهازكم وشاهدوه معًا في الوقت نفسه.", fr: "Partagez une vidéo ou votre écran et regardez ensemble." },
    "بازی با رفقا": { en: "Play with friends", tr: "Arkadaşlarınla oyna", ar: "العب مع الأصدقاء", fr: "Jouer entre amis" },
    "بازی‌های سبک و سرگرم‌کننده برای رقابت‌های دوستانه.": { en: "Light, fun games for friendly competition.", tr: "Dostça rekabet için hafif ve eğlenceli oyunlar.", ar: "ألعاب خفيفة وممتعة لمنافسة ودية.", fr: "Des jeux simples et amusants pour une compétition amicale." },
    "صدا و تصویر": { en: "Audio and video", tr: "Ses ve görüntü", ar: "الصوت والصورة", fr: "Audio et vidéo" },
    "چهره‌ها و خنده‌ها را کنار صفحهٔ مشترک داشته باشید.": { en: "See faces and share laughs alongside the shared screen.", tr: "Ortak ekranın yanında yüzleri görün, kahkahaları paylaşın.", ar: "شاهدوا الوجوه وتشاركوا الضحكات بجانب الشاشة المشتركة.", fr: "Retrouvez les visages et les rires à côté de l’écran partagé." },
    "اشتراک‌گذاری صفحه": { en: "Screen sharing", tr: "Ekran paylaşımı", ar: "مشاركة الشاشة", fr: "Partage d’écran" },
    "عکس، ویدئو یا هر چیزی را که روی صفحه‌ات داری نشان بده.": { en: "Show photos, videos, or anything on your screen.", tr: "Fotoğraf, video veya ekranındaki her şeyi göster.", ar: "اعرض الصور أو الفيديوهات أو أي شيء على شاشتك.", fr: "Montrez des photos, des vidéos ou tout ce qui s’affiche à l’écran." },
    "پاتوق‌ها": { en: "Rooms", tr: "Buluşma odaları", ar: "الغرف", fr: "Salons" },
    "یک اتاق انتخاب کن و سلام بده": { en: "Choose a room and say hello", tr: "Bir oda seç ve merhaba de", ar: "اختر غرفة وابدأ بالتحية", fr: "Choisissez un salon et dites bonjour" },
    "+ ساخت اتاق": { en: "+ Create room", tr: "+ Oda oluştur", ar: "+ إنشاء غرفة", fr: "+ Créer un salon" },
    "همه": { en: "All", tr: "Tümü", ar: "الكل", fr: "Tout" },
    "فیلم و ویدئو": { en: "Movies and video", tr: "Film ve video", ar: "الأفلام والفيديو", fr: "Films et vidéos" },
    "بازی": { en: "Games", tr: "Oyun", ar: "ألعاب", fr: "Jeux" },
    "گپ‌وگفت": { en: "Chat", tr: "Sohbet", ar: "دردشة", fr: "Discussion" },
    "🎬 تماشای فیلم": { en: "🎬 Movie night", tr: "🎬 Film gecesi", ar: "🎬 مشاهدة فيلم", fr: "🎬 Cinéma" },
    "۱۲ نفر": { en: "12 people", tr: "12 kişi", ar: "١٢ شخصًا", fr: "12 personnes" },
    "شب فیلم و پاپ‌کورن": { en: "Movie night and popcorn", tr: "Film ve patlamış mısır gecesi", ar: "ليلة فيلم وفشار", fr: "Soirée film et pop-corn" },
    "یک فیلم خوب، حال خوب‌تر 🍿": { en: "A good movie, an even better mood 🍿", tr: "Güzel bir film, daha güzel bir keyif 🍿", ar: "فيلم جميل ومزاج أجمل 🍿", fr: "Un bon film, encore meilleure humeur 🍿" },
    "ساختهٔ سارا": { en: "Hosted by Sara", tr: "Sara'nın odası", ar: "من تنظيم سارة", fr: "Par Sara" },
    "ورود به اتاق ←": { en: "Join room →", tr: "Odaya katıl →", ar: "انضم إلى الغرفة ←", fr: "Rejoindre →" },
    "🎮 بازی گروهی": { en: "🎮 Group games", tr: "🎮 Grup oyunu", ar: "🎮 ألعاب جماعية", fr: "🎮 Jeux en groupe" },
    "۶ نفر": { en: "6 people", tr: "6 kişi", ar: "٦ أشخاص", fr: "6 personnes" },
    "اتاق بازی نیمه‌شب": { en: "Midnight game room", tr: "Gece yarısı oyun odası", ar: "غرفة ألعاب منتصف الليل", fr: "Jeux de minuit" },
    "بازنده دور بعدی اسنک میاره 😄": { en: "The loser brings snacks next round 😄", tr: "Kaybeden sonraki tur atıştırmalık getirir 😄", ar: "الخاسر يجلب الوجبات الخفيفة في الجولة القادمة 😄", fr: "Le perdant apporte les snacks au prochain tour 😄" },
    "ساختهٔ آرمان": { en: "Hosted by Arman", tr: "Arman'ın odası", ar: "من تنظيم آرمان", fr: "Par Arman" },
    "☕ گپ‌وگفت": { en: "☕ Chat", tr: "☕ Sohbet", ar: "☕ دردشة", fr: "☕ Discussion" },
    "۴ نفر": { en: "4 people", tr: "4 kişi", ar: "٤ أشخاص", fr: "4 personnes" },
    "کافهٔ گفت‌وگو": { en: "Conversation café", tr: "Sohbet kafesi", ar: "مقهى الحوار", fr: "Café discussion" },
    "یه چای بردار، از روزت بگو ☕": { en: "Grab some tea and tell us about your day ☕", tr: "Bir çay al, gününü anlat ☕", ar: "أحضر كوب شاي وأخبرنا عن يومك ☕", fr: "Prenez un thé et racontez votre journée ☕" },
    "ساختهٔ مهسا": { en: "Hosted by Mahsa", tr: "Mahsa'nın odası", ar: "من تنظيم مهسا", fr: "Par Mahsa" },
    "📚 کتاب‌خوانی": { en: "📚 Book club", tr: "📚 Kitap kulübü", ar: "📚 نادي الكتاب", fr: "📚 Club de lecture" },
    "۸ نفر": { en: "8 people", tr: "8 kişi", ar: "٨ أشخاص", fr: "8 personnes" },
    "دورهمی کتاب‌خوانی": { en: "Book club", tr: "Kitap okuma buluşması", ar: "لقاء نادي الكتاب", fr: "Club de lecture" },
    "این هفته: داستان‌های کوتاه": { en: "This week: short stories", tr: "Bu hafta: kısa öyküler", ar: "هذا الأسبوع: قصص قصيرة", fr: "Cette semaine : nouvelles" },
    "ساختهٔ رها": { en: "Hosted by Raha", tr: "Raha'nın odası", ar: "من تنظيم رها", fr: "Par Raha" },
    "🃏 بردگیم": { en: "🃏 Board games", tr: "🃏 Masa oyunları", ar: "🃏 ألعاب الطاولة", fr: "🃏 Jeux de société" },
    "۵ نفر": { en: "5 people", tr: "5 kişi", ar: "٥ أشخاص", fr: "5 personnes" },
    "بردگیم و خنده": { en: "Board games and laughs", tr: "Masa oyunu ve kahkaha", ar: "ألعاب طاولة وضحك", fr: "Jeux de société et rires" },
    "قانون اول: زیادی جدی نگیریم!": { en: "Rule one: don't take it too seriously!", tr: "Birinci kural: fazla ciddiye almayalım!", ar: "القاعدة الأولى: لا نأخذ الأمر بجدية زائدة!", fr: "Règle numéro un : restons détendus !" },
    "ساختهٔ نیما": { en: "Hosted by Nima", tr: "Nima'nın odası", ar: "من تنظيم نيما", fr: "Par Nima" },
    "🎧 موسیقی": { en: "🎧 Music", tr: "🎧 Müzik", ar: "🎧 موسيقى", fr: "🎧 Musique" },
    "۳ نفر": { en: "3 people", tr: "3 kişi", ar: "٣ أشخاص", fr: "3 personnes" },
    "موسیقی برای تمرکز": { en: "Focus music", tr: "Odaklanma müziği", ar: "موسيقى للتركيز", fr: "Musique pour se concentrer" },
    "صدای کم، تمرکز بیشتر 🌿": { en: "Low volume, better focus 🌿", tr: "Düşük ses, daha iyi odak 🌿", ar: "صوت منخفض وتركيز أكبر 🌿", fr: "Un son doux pour mieux se concentrer 🌿" },
    "ساختهٔ کیان": { en: "Hosted by Kian", tr: "Kian'ın odası", ar: "من تنظيم كيان", fr: "Par Kian" },
    "اتاقی با این مشخصات پیدا نکردیم. عبارت دیگری را امتحان کن.": { en: "No rooms match. Try another search.", tr: "Eşleşen oda yok. Başka bir arama deneyin.", ar: "لم نعثر على غرف مطابقة. جرّب عبارة أخرى.", fr: "Aucun salon trouvé. Essayez une autre recherche." },
    "سه قدم تا دورهمی": { en: "Three steps to get together", tr: "Buluşmaya üç adım", ar: "ثلاث خطوات للقاء", fr: "Trois étapes pour se retrouver" },
    "بی‌دردسر شروع کنید": { en: "Getting started is easy", tr: "Başlamak çok kolay", ar: "ابدأ بسهولة", fr: "Commencez simplement" },
    "لازم نیست چیزی نصب کنید یا کلی تنظیمات انجام بدهید.": { en: "No installation or complicated setup needed.", tr: "Uygulama yüklemeniz veya karmaşık ayarlar yapmanız gerekmez.", ar: "لا حاجة إلى تثبيت أي شيء أو إجراء إعدادات معقدة.", fr: "Aucune installation ni configuration compliquée." },
    "قدم ۰۱": { en: "STEP 01", tr: "ADIM 01", ar: "الخطوة ٠١", fr: "ÉTAPE 01" },
    "اتاقت را بساز": { en: "Create your room", tr: "Odanı oluştur", ar: "أنشئ غرفتك", fr: "Créez votre salon" },
    "اسم و حال‌وهوای اتاقت را انتخاب کن؛ همین.": { en: "Choose a name and a vibe. That's all.", tr: "Bir ad ve ortam seçmen yeterli.", ar: "اختر اسمًا وأجواءً تناسبك، وهذا كل شيء.", fr: "Choisissez un nom et une ambiance, c’est tout." },
    "قدم ۰۲": { en: "STEP 02", tr: "ADIM 02", ar: "الخطوة ٠٢", fr: "ÉTAPE 02" },
    "لینک را بفرست": { en: "Share the link", tr: "Bağlantıyı paylaş", ar: "أرسل الرابط", fr: "Partagez le lien" },
    "لینک دعوت را برای آدم‌های خودت بفرست.": { en: "Send the invite link to your friends.", tr: "Davet bağlantısını arkadaşlarına gönder.", ar: "أرسل رابط الدعوة إلى أصدقائك.", fr: "Envoyez le lien d’invitation à vos amis." },
    "قدم ۰۳": { en: "STEP 03", tr: "ADIM 03", ar: "الخطوة ٠٣", fr: "ÉTAPE 03" },
    "شروع کنید": { en: "Enjoy your time", tr: "Birlikte vakit geçirin", ar: "استمتعوا بوقتكم", fr: "Profitez du moment" },
    "تماشا، بازی یا گپ؛ انتخاب با شماست.": { en: "Watch, play, or chat. You choose.", tr: "İzle, oyna ya da sohbet et. Seçim senin.", ar: "شاهدوا أو العبوا أو تحدثوا؛ الخيار لكم.", fr: "Regardez, jouez ou discutez. À vous de choisir." },
    "جای همه دور هم خالیه؟": { en: "Is everyone ready to join?", tr: "Herkesin yeri hazır mı?", ar: "هل أنتم مستعدون للقاء؟", fr: "Tout le monde est prêt à se retrouver ?" },
    "اتاقت رو بساز و لینک دعوت رو همین الان بفرست.": { en: "Create a room and send the invite link now.", tr: "Bir oda oluştur ve davet bağlantısını hemen gönder.", ar: "أنشئ غرفة وأرسل رابط الدعوة الآن.", fr: "Créez un salon et envoyez le lien d’invitation." },
    "شروع یک دورهمی": { en: "Start a hangout", tr: "Buluşmayı başlat", ar: "ابدأ اللقاء", fr: "Lancer une rencontre" },
    "سوال‌های پرتکرار": { en: "Frequently asked questions", tr: "Sık sorulan sorular", ar: "الأسئلة الشائعة", fr: "Questions fréquentes" },
    "چیزهایی که": { en: "Things you", tr: "Merak", ar: "أمور قد", fr: "Ce que vous" },
    "شاید بپرسی": { en: "might ask", tr: "ettikleriniz", ar: "تسألون عنه", fr: "vous demandez" },
    "پاسخ چند سوال برای شروع راحت‌تر.": { en: "A few answers to help you get started.", tr: "Başlamanıza yardımcı olacak birkaç yanıt.", ar: "إجابات تساعدك على البدء بسهولة.", fr: "Quelques réponses pour bien commencer." },
    "برای استفاده باید برنامه نصب کنم؟": { en: "Do I need to install an app?", tr: "Uygulama yüklemem gerekiyor mu?", ar: "هل أحتاج إلى تثبيت تطبيق؟", fr: "Dois-je installer une application ?" },
    "سامیکا در مرورگر اجرا می‌شود و نصب نمی‌خواهد. برای تماس زنده، فایل‌ها را روی localhost یا یک سایت HTTPS اجرا کنید و لینک اتاق را برای دوستان بفرستید.": { en: "Samika runs in your browser with no installation. For live calls, open it on localhost or an HTTPS website and share the room link.", tr: "Samika tarayıcınızda çalışır, kurulum gerekmez. Canlı arama için localhost veya HTTPS kullanan bir sitede açıp oda bağlantısını paylaşın.", ar: "يعمل ساميكا في المتصفح من دون تثبيت. للمكالمات المباشرة، افتحه على localhost أو موقع HTTPS وشارك رابط الغرفة.", fr: "Samika fonctionne dans votre navigateur, sans installation. Pour les appels, ouvrez-le sur localhost ou un site HTTPS et partagez le lien." },
    "می‌توانم اتاق را خصوصی کنم؟": { en: "Can I make my room private?", tr: "Odamı özel yapabilir miyim?", ar: "هل يمكنني جعل الغرفة خاصة؟", fr: "Puis-je rendre mon salon privé ?" },
    "اتاق با یک کد تصادفی ساخته می‌شود و ورود از طریق لینک دعوت است. در این نسخه فهرست اتاق‌های عمومی، حساب کاربری یا رمز جداگانه وجود ندارد.": { en: "Each room gets a random code and can be joined through its invite link. This version has no public room directory, accounts, or separate passwords.", tr: "Her oda rastgele bir kod alır ve davet bağlantısıyla açılır. Bu sürümde herkese açık oda listesi, hesap veya ayrı parola yoktur.", ar: "تُنشأ لكل غرفة شفرة عشوائية ويمكن الانضمام إليها عبر رابط الدعوة. لا تتضمن هذه النسخة دليلًا عامًا للغرف أو حسابات أو كلمات مرور منفصلة.", fr: "Chaque salon reçoit un code aléatoire et son lien d’invitation. Cette version ne propose ni annuaire public, ni comptes, ni mot de passe distinct." },
    "آیا دوستانم تصویر و صدای هم را می‌بینند؟": { en: "Can my friends see and hear me?", tr: "Arkadaşlarım beni görebilir ve duyabilir mi?", ar: "هل يستطيع أصدقائي رؤيتي وسماعي؟", fr: "Mes amis peuvent-ils me voir et m’entendre ?" },
    "بله. بعد از ورود به اتاق، دکمهٔ میکروفن یا دوربین را بزنید و اجازهٔ مرورگر را بدهید. رسانه مستقیم با WebRTC بین مرورگرها منتقل می‌شود؛ سامیکا آن را ضبط نمی‌کند.": { en: "Yes. Join a room, turn on your microphone or camera, and allow browser access. WebRTC sends media directly between browsers; Samika does not record it.", tr: "Evet. Odaya katılın, mikrofonu veya kamerayı açın ve tarayıcı izni verin. WebRTC medyayı tarayıcılar arasında doğrudan iletir; Samika kayıt yapmaz.", ar: "نعم. انضم إلى الغرفة وشغّل الميكروفون أو الكاميرا واسمح للمتصفح بالوصول. ينقل WebRTC الوسائط مباشرةً بين المتصفحات ولا يسجلها ساميكا.", fr: "Oui. Rejoignez un salon, activez le micro ou la caméra et autorisez le navigateur. WebRTC transmet les médias directement entre navigateurs ; Samika ne les enregistre pas." },
    "همه می‌توانند ویدئو را هم‌زمان تماشا کنند؟": { en: "Can everyone watch a video together?", tr: "Herkes aynı videoyu birlikte izleyebilir mi?", ar: "هل يمكن للجميع مشاهدة الفيديو معًا؟", fr: "Tout le monde peut-il regarder une vidéo ensemble ?" },
    "برای نمایش ویدئو، شیر اسکرین را بزنید و زبانه یا پنجرهٔ ویدئو را انتخاب کنید. صدای زبانه را هم در پنجرهٔ اشتراک‌گذاری فعال کنید. پخش‌کنندهٔ همگام‌شدهٔ داخلی هنوز در این نسخه نیست.": { en: "To show a video, start screen sharing and choose its tab or window. Enable tab audio in the sharing dialog. A synchronized player is not included yet.", tr: "Videoyu göstermek için ekran paylaşımını başlatıp video sekmesini veya penceresini seçin. Paylaşım penceresinde sekme sesini açın. Bu sürümde senkron oynatıcı yoktur.", ar: "لعرض فيديو، ابدأ مشاركة الشاشة واختر علامة التبويب أو النافذة. فعّل صوت علامة التبويب من نافذة المشاركة. لا يتضمن هذا الإصدار مشغلًا متزامنًا بعد.", fr: "Pour montrer une vidéo, partagez l’onglet ou la fenêtre correspondante et activez son audio. Ce n’est pas encore un lecteur synchronisé." },
    "سامیکا · Samika": { en: "Samika", tr: "Samika", ar: "ساميكا", fr: "Samika" },
    "تهیه‌شده توسط سام کاظمی ✦": { en: "Made by Sam Kazemi ✦", tr: "Sam Kazemi tarafından hazırlandı ✦", ar: "إعداد سام كاظمي ✦", fr: "Créé par Sam Kazemi ✦" },
    "اتاقت رو بساز ✨": { en: "Create your room ✨", tr: "Odanı oluştur ✨", ar: "أنشئ غرفتك ✨", fr: "Créez votre salon ✨" },
    "یک اسم انتخاب کن؛ دورهمی از همین‌جا شروع می‌شه.": { en: "Choose a name to get your hangout started.", tr: "Buluşmanı başlatmak için bir ad seç.", ar: "اختر اسمًا لتبدأ لقاءك.", fr: "Choisissez un nom pour commencer." },
    "اسم اتاق": { en: "Room name", tr: "Oda adı", ar: "اسم الغرفة", fr: "Nom du salon" },
    "اسم نمایشی شما": { en: "Your display name", tr: "Görünen adınız", ar: "اسم العرض", fr: "Votre nom affiché" },
    "چه کسانی می‌تونن وارد بشن؟": { en: "Who can join?", tr: "Kimler katılabilir?", ar: "من يمكنه الانضمام؟", fr: "Qui peut rejoindre ?" },
    "خصوصی · فقط با لینک": { en: "Private · invite link only", tr: "Özel · yalnızca davet bağlantısı", ar: "خاصة · برابط الدعوة فقط", fr: "Privé · lien d’invitation uniquement" },
    "عمومی · قابل کشف": { en: "Public · discoverable", tr: "Herkese açık · keşfedilebilir", ar: "عامة · قابلة للاكتشاف", fr: "Public · visible" },
    "ساخت اتاق و ادامه ←": { en: "Create room and continue →", tr: "Oda oluştur ve devam et →", ar: "أنشئ الغرفة وتابع ←", fr: "Créer le salon et continuer →" },
    "اتاق دورهمی": { en: "Hangout room", tr: "Buluşma odası", ar: "غرفة لقاء", fr: "Salon de rencontre" },
    "● در حال اتصال…": { en: "● Connecting…", tr: "● Bağlanıyor…", ar: "● جارٍ الاتصال…", fr: "● Connexion…" },
    "کد اتاق —": { en: "Room code —", tr: "Oda kodu —", ar: "رمز الغرفة —", fr: "Code du salon —" },
    "کپی لینک دعوت": { en: "Copy invite link", tr: "Davet bağlantısını kopyala", ar: "انسخ رابط الدعوة", fr: "Copier le lien d’invitation" },
    "✦ سامیکا · ارتباط زنده": { en: "✦ Samika · Live room", tr: "✦ Samika · Canlı oda", ar: "✦ ساميكا · لقاء مباشر", fr: "✦ Samika · Salon en direct" },
    "خوش اومدی به سامیکا!": { en: "Welcome to Samika!", tr: "Samika'ya hoş geldin!", ar: "أهلًا بك في ساميكا!", fr: "Bienvenue sur Samika !" },
    "میکروفن یا دوربین را روشن کن و دوستات را دعوت کن": { en: "Turn on your mic or camera and invite your friends", tr: "Mikrofonunu ya da kameranı aç, arkadaşlarını davet et", ar: "شغّل الميكروفون أو الكاميرا وادعُ أصدقاءك", fr: "Activez le micro ou la caméra et invitez vos amis" },
    "روشن‌کردن میکروفن": { en: "Turn on microphone", tr: "Mikrofonu aç", ar: "تشغيل الميكروفون", fr: "Activer le micro" },
    "روشن‌کردن دوربین": { en: "Turn on camera", tr: "Kamerayı aç", ar: "تشغيل الكاميرا", fr: "Activer la caméra" },
    "شیر اسکرین": { en: "Share screen", tr: "Ekranı paylaş", ar: "مشاركة الشاشة", fr: "Partager l’écran" },
    "چت": { en: "Chat", tr: "Sohbet", ar: "دردشة", fr: "Discussion" },
    "خروج": { en: "Leave", tr: "Ayrıl", ar: "مغادرة", fr: "Quitter" },
    "گپ دورهمی": { en: "Room chat", tr: "Oda sohbeti", ar: "دردشة الغرفة", fr: "Discussion du salon" },
    "اتاق سامیکا": { en: "Samika room", tr: "Samika odası", ar: "غرفة ساميكا", fr: "Salon Samika" },
    "به اتاق خوش اومدی! دوستات رو دعوت کن 👋": { en: "Welcome to the room! Invite your friends 👋", tr: "Odaya hoş geldin! Arkadaşlarını davet et 👋", ar: "أهلًا بك في الغرفة! ادعُ أصدقاءك 👋", fr: "Bienvenue ! Invitez vos amis 👋" },
    "یه چیزی بنویس...": { en: "Write a message…", tr: "Bir mesaj yaz…", ar: "اكتب رسالة…", fr: "Écrivez un message…" },
    "فرستادن پیام": { en: "Send message", tr: "Mesaj gönder", ar: "إرسال الرسالة", fr: "Envoyer" },
    "زبان سایت": { en: "Site language", tr: "Site dili", ar: "لغة الموقع", fr: "Langue du site" },
    "جست‌وجوی اتاق...": { en: "Search rooms…", tr: "Odaları ara…", ar: "ابحث عن الغرف…", fr: "Rechercher un salon…" },
    "مثلاً: جمعه‌شب با بچه‌ها": { en: "For example: Friday movie night", tr: "Örnek: Cuma film gecesi", ar: "مثال: سهرة فيلم الجمعة", fr: "Ex. : soirée cinéma vendredi" },
    "مثلاً: سام": { en: "For example: Sam", tr: "Örnek: Sam", ar: "مثال: سام", fr: "Ex. : Sam" },
    "زبان": { en: "Language", tr: "Dil", ar: "اللغة", fr: "Langue" },
    "پیش‌نمایش یک اتاق دورهمی آنلاین": { en: "Preview of an online hangout room", tr: "Çevrimiçi buluşma odası önizlemesi", ar: "معاينة غرفة لقاء عبر الإنترنت", fr: "Aperçu d’un salon en ligne" },
    "اتاق نشیمن گرم در شب": { en: "A cozy living room at night", tr: "Gece sıcak bir oturma odası", ar: "غرفة معيشة دافئة ليلًا", fr: "Un salon chaleureux le soir" },
    "سامیکا، صفحهٔ اصلی": { en: "Samika home page", tr: "Samika ana sayfa", ar: "الصفحة الرئيسية لساميكا", fr: "Accueil Samika" },
    "ناوبری اصلی": { en: "Main navigation", tr: "Ana gezinme", ar: "التنقل الرئيسي", fr: "Navigation principale" },
    "دسته‌بندی اتاق‌ها": { en: "Room categories", tr: "Oda kategorileri", ar: "فئات الغرف", fr: "Catégories de salons" },
    "بستن": { en: "Close", tr: "Kapat", ar: "إغلاق", fr: "Fermer" },
    "خروج از اتاق": { en: "Leave room", tr: "Odadan ayrıl", ar: "مغادرة الغرفة", fr: "Quitter le salon" },
    "روشن و خاموش کردن میکروفن": { en: "Toggle microphone", tr: "Mikrofonu aç/kapat", ar: "تشغيل/إيقاف الميكروفون", fr: "Activer/désactiver le micro" },
    "روشن و خاموش کردن دوربین": { en: "Toggle camera", tr: "Kamerayı aç/kapat", ar: "تشغيل/إيقاف الكاميرا", fr: "Activer/désactiver la caméra" },
    "شروع یا توقف اشتراک‌گذاری صفحه": { en: "Start or stop screen sharing", tr: "Ekran paylaşımını başlat/durdur", ar: "بدء مشاركة الشاشة أو إيقافها", fr: "Démarrer ou arrêter le partage d’écran" },
    "نمایش چت": { en: "Show chat", tr: "Sohbeti göster", ar: "إظهار الدردشة", fr: "Afficher la discussion" },
    "پیام چت": { en: "Chat message", tr: "Sohbet mesajı", ar: "رسالة الدردشة", fr: "Message de discussion" },
    "{{name}} · شما": { en: "{{name}} · You", tr: "{{name}} · Siz", ar: "{{name}} · أنت", fr: "{{name}} · Vous" },
    "در این دستگاه": { en: "This device", tr: "Bu cihaz", ar: "هذا الجهاز", fr: "Cet appareil" },
    "در اتاق": { en: "In room", tr: "Odada", ar: "في الغرفة", fr: "Dans le salon" },
    "مهمان": { en: "Guest", tr: "Misafir", ar: "ضيف", fr: "Invité" },
    "میکروفن روشن": { en: "Microphone on", tr: "Mikrofon açık", ar: "الميكروفون يعمل", fr: "Micro activé" },
    "دوربین روشن": { en: "Camera on", tr: "Kamera açık", ar: "الكاميرا تعمل", fr: "Caméra activée" },
    "صدا متصل": { en: "Audio connected", tr: "Ses bağlı", ar: "الصوت متصل", fr: "Audio connecté" },
    "{{name}} وارد اتاق شد": { en: "{{name}} joined the room", tr: "{{name}} odaya katıldı", ar: "انضم {{name}} إلى الغرفة", fr: "{{name}} a rejoint le salon" },
    "{{name}} از اتاق خارج شد": { en: "{{name}} left the room", tr: "{{name}} odadan ayrıldı", ar: "غادر {{name}} الغرفة", fr: "{{name}} a quitté le salon" },
    "{{name}} · وصل": { en: "{{name}} · Connected", tr: "{{name}} · Bağlandı", ar: "{{name}} · متصل", fr: "{{name}} · Connecté" },
    "کد {{code}}": { en: "Code {{code}}", tr: "Kod {{code}}", ar: "الرمز {{code}}", fr: "Code {{code}}" },
    "● سرور وصل است": { en: "● Server connected", tr: "● Sunucuya bağlandı", ar: "● الخادم متصل", fr: "● Serveur connecté" },
    "● ورود ناموفق": { en: "● Could not join", tr: "● Giriş başarısız", ar: "● تعذّر الانضمام", fr: "● Connexion impossible" },
    "● سرور اجرا نشده": { en: "● Server is not running", tr: "● Sunucu çalışmıyor", ar: "● الخادم لا يعمل", fr: "● Serveur arrêté" },
    "● نشانی سرور نامعتبر": { en: "● Invalid server address", tr: "● Sunucu adresi geçersiz", ar: "● عنوان الخادم غير صالح", fr: "● Adresse du serveur invalide" },
    "● اتصال ناموفق": { en: "● Connection failed", tr: "● Bağlantı başarısız", ar: "● فشل الاتصال", fr: "● Échec de la connexion" },
    "● ارتباط قطع شد": { en: "● Connection lost", tr: "● Bağlantı kesildi", ar: "● انقطع الاتصال", fr: "● Connexion interrompue" },
    "اول صبر کن اتصال اتاق برقرار شود؛ اگر نشد npm start را بررسی کن": { en: "Wait for the room to connect first. If it does not, check npm start.", tr: "Önce oda bağlantısını bekle. Bağlanmazsa npm start komutunu kontrol et.", ar: "انتظر اتصال الغرفة أولًا. إذا لم يتصل، فتحقق من npm start.", fr: "Attendez la connexion au salon. Sinon, vérifiez npm start." },
    "هنگام شیر اسکرین، دوربین را نمی‌توان جداگانه تغییر داد": { en: "The camera cannot be changed separately while sharing your screen.", tr: "Ekran paylaşırken kamera ayrı olarak değiştirilemez.", ar: "لا يمكن تغيير الكاميرا بشكل منفصل أثناء مشاركة الشاشة.", fr: "La caméra ne peut pas être modifiée séparément pendant le partage d’écran." },
    "میکروفن روشن شد": { en: "Microphone turned on", tr: "Mikrofon açıldı", ar: "تم تشغيل الميكروفون", fr: "Micro activé" },
    "میکروفن خاموش شد": { en: "Microphone turned off", tr: "Mikrofon kapatıldı", ar: "تم إيقاف الميكروفون", fr: "Micro désactivé" },
    "دوربین روشن شد": { en: "Camera turned on", tr: "Kamera açıldı", ar: "تم تشغيل الكاميرا", fr: "Caméra activée" },
    "دوربین خاموش شد": { en: "Camera turned off", tr: "Kamera kapatıldı", ar: "تم إيقاف الكاميرا", fr: "Caméra désactivée" },
    "برای تماس، سامیکا را روی localhost یا یک نشانی HTTPS باز کن": { en: "For calls, open Samika on localhost or an HTTPS address.", tr: "Arama için Samika'yı localhost veya HTTPS adresinde aç.", ar: "لإجراء المكالمات، افتح ساميكا على localhost أو عنوان HTTPS.", fr: "Pour appeler, ouvrez Samika sur localhost ou une adresse HTTPS." },
    "مرورگر رسانهٔ درخواستی را برنگرداند": { en: "The browser did not return the requested media.", tr: "Tarayıcı istenen medyayı sağlamadı.", ar: "لم يُعِد المتصفح الوسائط المطلوبة.", fr: "Le navigateur n’a pas fourni le média demandé." },
    "میکروفن به اتاق وصل شد": { en: "Microphone connected to the room", tr: "Mikrofon odaya bağlandı", ar: "تم توصيل الميكروفون بالغرفة", fr: "Micro connecté au salon" },
    "دوربین به اتاق وصل شد": { en: "Camera connected to the room", tr: "Kamera odaya bağlandı", ar: "تم توصيل الكاميرا بالغرفة", fr: "Caméra connectée au salon" },
    "اجازهٔ استفاده از میکروفن یا دوربین داده نشد": { en: "Microphone or camera permission was denied.", tr: "Mikrofon veya kamera izni verilmedi.", ar: "لم يُسمح باستخدام الميكروفون أو الكاميرا.", fr: "L’accès au micro ou à la caméra a été refusé." },
    "میکروفن یا دوربین روی دستگاه پیدا نشد": { en: "No microphone or camera was found on this device.", tr: "Bu cihazda mikrofon veya kamera bulunamadı.", ar: "لم يتم العثور على ميكروفون أو كاميرا في هذا الجهاز.", fr: "Aucun micro ni caméra n’a été trouvé sur cet appareil." },
    "اتصال رسانه انجام نشد؛ سامیکا را در Chrome یا Edge و با HTTPS باز کن": { en: "Media could not connect. Open Samika over HTTPS in a browser that supports media calls.", tr: "Medya bağlanamadı. Samika'yı HTTPS üzerinden medya aramalarını destekleyen bir tarayıcıda aç.", ar: "تعذّر اتصال الوسائط. افتح ساميكا عبر HTTPS في متصفح يدعم المكالمات.", fr: "Impossible de connecter le média. Ouvrez Samika en HTTPS dans un navigateur compatible." },
    "اتصال رسانه انجام نشد؛ سامیکا را با HTTPS و در مرورگری به‌روز باز کن": { en: "Media could not connect. Open Samika over HTTPS in an up-to-date browser.", tr: "Medya bağlanamadı. Samika'yı HTTPS kullanan güncel bir tarayıcıda aç.", ar: "تعذّر اتصال الوسائط. افتح ساميكا عبر HTTPS في متصفح حديث.", fr: "Impossible de connecter le média. Ouvrez Samika en HTTPS dans un navigateur à jour." },
    "برای شنیدن صدا، پخش رسانه را در مرورگر فعال کن": { en: "Enable media playback in your browser to hear audio.", tr: "Sesi duymak için tarayıcıda medya oynatımını etkinleştir.", ar: "فعّل تشغيل الوسائط في المتصفح لسماع الصوت.", fr: "Autorisez la lecture des médias dans votre navigateur pour entendre le son." },
    "شیر اسکرین متوقف شد": { en: "Screen sharing stopped", tr: "Ekran paylaşımı durduruldu", ar: "تم إيقاف مشاركة الشاشة", fr: "Partage d’écran arrêté" },
    "برای شیر اسکرین، اول باید به سرور اتاق وصل شوی": { en: "Connect to the room server before sharing your screen.", tr: "Ekran paylaşmadan önce oda sunucusuna bağlan.", ar: "اتصل بخادم الغرفة قبل مشاركة الشاشة.", fr: "Connectez-vous au serveur du salon avant de partager l’écran." },
    "برای شیر اسکرین، سامیکا را در Chrome یا Edge و با HTTPS باز کن": { en: "Screen sharing is unavailable in this browser. Try a browser that supports screen capture over HTTPS.", tr: "Bu tarayıcıda ekran paylaşımı kullanılamıyor. HTTPS üzerinden ekran yakalamayı destekleyen bir tarayıcı deneyin.", ar: "مشاركة الشاشة غير متاحة في هذا المتصفح. جرّب متصفحًا يدعم التقاط الشاشة عبر HTTPS.", fr: "Le partage d’écran n’est pas disponible dans ce navigateur. Essayez un navigateur compatible en HTTPS." },
    "اشتراک صفحه در این مرورگر پشتیبانی نمی‌شود": { en: "Screen sharing is not supported in this browser.", tr: "Bu tarayıcı ekran paylaşımını desteklemiyor.", ar: "مشاركة الشاشة غير مدعومة في هذا المتصفح.", fr: "Le partage d’écran n’est pas pris en charge dans ce navigateur." },
    "توقف شیر": { en: "Stop sharing", tr: "Paylaşımı durdur", ar: "إيقاف المشاركة", fr: "Arrêter le partage" },
    "انتخاب صفحه باز شد؛ تصویر صفحه به اتاق فرستاده می‌شود": { en: "Choose a screen or window to share with the room.", tr: "Odayla paylaşmak için bir ekran veya pencere seç.", ar: "اختر شاشة أو نافذة لمشاركتها مع الغرفة.", fr: "Choisissez l’écran ou la fenêtre à partager." },
    "اشتراک صفحه لغو شد": { en: "Screen sharing was cancelled", tr: "Ekran paylaşımı iptal edildi", ar: "تم إلغاء مشاركة الشاشة", fr: "Partage d’écran annulé" },
    "اشتراک صفحه شروع نشد": { en: "Screen sharing did not start", tr: "Ekran paylaşımı başlatılamadı", ar: "لم تبدأ مشاركة الشاشة", fr: "Le partage d’écran n’a pas démarré" },
    "برقراری ارتباط با یکی از اعضا ناموفق بود": { en: "Could not connect to one of the participants.", tr: "Katılımcılardan biriyle bağlantı kurulamadı.", ar: "تعذّر الاتصال بأحد المشاركين.", fr: "Impossible de connecter l’un des participants." },
    "برقراری تماس با یکی از اعضا ناموفق بود": { en: "Could not connect to one of the participants.", tr: "Katılımcılardan biriyle bağlantı kurulamadı.", ar: "تعذّر الاتصال بأحد المشاركين.", fr: "Impossible de connecter l’un des participants." },
    "اتصال همتا برقرار نشد؛ این شبکه ممکن است به TURN نیاز داشته باشد": { en: "Peer connection failed. This network may require a TURN server.", tr: "Eş bağlantısı kurulamadı. Bu ağ TURN sunucusu gerektirebilir.", ar: "فشل اتصال النظير. قد تحتاج هذه الشبكة إلى خادم TURN.", fr: "La connexion entre pairs a échoué. Ce réseau peut nécessiter un serveur TURN." },
    "یکی از دوستان": { en: "A participant", tr: "Katılımcılardan biri", ar: "أحد المشاركين", fr: "Un participant" },
    "مهمان {{n}}": { en: "Guest {{n}}", tr: "Misafir {{n}}", ar: "ضيف {{n}}", fr: "Invité {{n}}" },
    "اتصال همتا ناموفق بود": { en: "Peer connection failed", tr: "Eş bağlantısı başarısız", ar: "فشل اتصال النظير", fr: "La connexion entre pairs a échoué" },
    "خطای اتصال": { en: "Connection error", tr: "Bağlantı hatası", ar: "خطأ في الاتصال", fr: "Erreur de connexion" },
    "برای تماس زنده، پوشه را با دستور npm start اجرا کن": { en: "To make live calls, start the app with npm start.", tr: "Canlı arama için uygulamayı npm start ile çalıştır.", ar: "لإجراء مكالمات مباشرة، شغّل التطبيق باستخدام npm start.", fr: "Pour passer des appels, démarrez l’application avec npm start." },
    "سرور سامیکا در دسترس نیست؛ npm start را اجرا کن یا سرور را بررسی کن": { en: "Samika's server is unavailable. Run npm start or check the server.", tr: "Samika sunucusu kullanılamıyor. npm start komutunu çalıştır veya sunucuyu kontrol et.", ar: "خادم ساميكا غير متاح. شغّل npm start أو تحقق من الخادم.", fr: "Le serveur Samika est indisponible. Lancez npm start ou vérifiez le serveur." },
    "اتصال به اتاق قطع شد؛ صفحه را تازه‌سازی کن تا دوباره وصل شوی": { en: "Room connection lost. Refresh the page to reconnect.", tr: "Oda bağlantısı kesildi. Yeniden bağlanmak için sayfayı yenile.", ar: "انقطع اتصال الغرفة. حدّث الصفحة لإعادة الاتصال.", fr: "Connexion au salon interrompue. Actualisez la page pour vous reconnecter." },
    "اتاق دعوت‌شدهٔ سامیکا": { en: "Samika invite room", tr: "Samika davet odası", ar: "غرفة دعوة ساميكا", fr: "Salon d’invitation Samika" },
    "به اتاق سامیکا خوش اومدی! لینک را برای دوستانت بفرست 👋": { en: "Welcome to Samika! Send the invite link to your friends 👋", tr: "Samika'ya hoş geldin! Davet bağlantısını arkadaşlarına gönder 👋", ar: "أهلًا بك في ساميكا! أرسل رابط الدعوة إلى أصدقائك 👋", fr: "Bienvenue sur Samika ! Envoyez le lien à vos amis 👋" },
    "دورهمی دوستانه": { en: "Friends' hangout", tr: "Arkadaş buluşması", ar: "لقاء الأصدقاء", fr: "Rencontre entre amis" },
    "اتاق خصوصی سامیکا ساخته شد": { en: "Private Samika room created", tr: "Özel Samika odası oluşturuldu", ar: "تم إنشاء غرفة ساميكا خاصة", fr: "Salon privé Samika créé" },
    "اتاق عمومی ساخته شد؛ اتاق‌های عمومی هنوز فهرست نمی‌شوند": { en: "Public room created. Public rooms are not listed yet.", tr: "Herkese açık oda oluşturuldu. Odalar henüz listelenmiyor.", ar: "تم إنشاء غرفة عامة. لا تظهر الغرف العامة في قائمة بعد.", fr: "Salon public créé. Les salons publics ne sont pas encore répertoriés." },
    "از اتاق خارج شدی": { en: "You left the room", tr: "Odadan ayrıldın", ar: "غادرت الغرفة", fr: "Vous avez quitté le salon" },
    "برای ساخت لینک دعوت، سامیکا را با npm start اجرا کن": { en: "Start Samika with npm start to create an invite link.", tr: "Davet bağlantısı için Samika'yı npm start ile çalıştır.", ar: "لإنشاء رابط دعوة، شغّل ساميكا باستخدام npm start.", fr: "Lancez Samika avec npm start pour créer un lien d’invitation." },
    "لینک دعوت کپی شد؛ دوستت با بازکردنش وارد همین اتاق می‌شود": { en: "Invite link copied. Your friend can join this room with it.", tr: "Davet bağlantısı kopyalandı. Arkadaşın bu bağlantıyla odaya katılabilir.", ar: "تم نسخ رابط الدعوة. يمكن لصديقك الانضمام إلى الغرفة عبره.", fr: "Lien copié. Votre ami peut rejoindre ce salon avec ce lien." },
    "مرورگر اجازهٔ کپی نداد؛ نشانی اتاق را از نوار آدرس کپی کن": { en: "The browser blocked copying. Copy the room address from the address bar.", tr: "Tarayıcı kopyalamaya izin vermedi. Oda adresini adres çubuğundan kopyala.", ar: "لم يسمح المتصفح بالنسخ. انسخ عنوان الغرفة من شريط العنوان.", fr: "Le navigateur a bloqué la copie. Copiez l’adresse du salon depuis la barre d’adresse." },
    "چت نمایش داده شد": { en: "Chat shown", tr: "Sohbet gösteriliyor", ar: "تم إظهار الدردشة", fr: "Discussion affichée" },
    "چت پنهان شد": { en: "Chat hidden", tr: "Sohbet gizlendi", ar: "تم إخفاء الدردشة", fr: "Discussion masquée" },
    "پیام ارسال نشد؛ اتصال اتاق برقرار نیست": { en: "Message not sent. The room is not connected.", tr: "Mesaj gönderilmedi. Oda bağlantısı yok.", ar: "لم تُرسل الرسالة. الغرفة غير متصلة.", fr: "Message non envoyé. Le salon n’est pas connecté." },
    "شما": { en: "You", tr: "Siz", ar: "أنت", fr: "Vous" },
    "پیام ارسال نشد؛ اتصال اتاق قطع است": { en: "Message not sent. Room connection was lost.", tr: "Mesaj gönderilmedi. Oda bağlantısı kesildi.", ar: "لم تُرسل الرسالة. انقطع اتصال الغرفة.", fr: "Message non envoyé. La connexion au salon est interrompue." },
    "کد اتاق {{code}}": { en: "Room code {{code}}", tr: "Oda kodu {{code}}", ar: "رمز الغرفة {{code}}", fr: "Code du salon {{code}}" },
    "اتاق سامیکا · وصل": { en: "Samika room · Connected", tr: "Samika odası · Bağlandı", ar: "غرفة ساميكا · متصلة", fr: "Salon Samika · Connecté" },
    "یک پاتوق آنلاین برای تماشای فیلم، بازی و گپ‌وگفت با دوستان.": { en: "An online hangout to watch movies, play games, and chat with friends.", tr: "Arkadaşlarla film izlemek, oyun oynamak ve sohbet etmek için çevrimiçi bir buluşma alanı.", ar: "مساحة لقاء عبر الإنترنت لمشاهدة الأفلام ولعب الألعاب والدردشة مع الأصدقاء.", fr: "Un espace en ligne pour regarder des films, jouer et discuter avec des amis." },
    "جست‌وجوی اتاق": { en: "Search rooms", tr: "Oda ara", ar: "ابحث عن الغرف", fr: "Rechercher un salon" },
    "شب فیلم و پاپ کورن": { en: "Movie night and popcorn", tr: "Film ve patlamış mısır gecesi", ar: "ليلة فيلم وفشار", fr: "Soirée film et pop-corn" },
    "اتاق بازی نیمه شب": { en: "Midnight game room", tr: "Gece yarısı oyun odası", ar: "غرفة ألعاب منتصف الليل", fr: "Jeux de minuit" },
    "کافه گفتگو": { en: "Conversation café", tr: "Sohbet kafesi", ar: "مقهى الحوار", fr: "Café discussion" },
    "دورهمی کتابخوانی": { en: "Book club", tr: "Kitap okuma buluşması", ar: "لقاء نادي الكتاب", fr: "Club de lecture" },
    "+۱": { en: "+1", tr: "+1", ar: "+١", fr: "+1" },
    "پیام نامعتبر بود.": { en: "The message was invalid.", tr: "Mesaj geçersizdi.", ar: "كانت الرسالة غير صالحة.", fr: "Le message était invalide." },
    "این اتصال قبلاً وارد یک اتاق شده است.": { en: "This connection has already joined a room.", tr: "Bu bağlantı zaten bir odaya katıldı.", ar: "انضم هذا الاتصال إلى غرفة بالفعل.", fr: "Cette connexion a déjà rejoint un salon." },
    "کد اتاق معتبر نیست.": { en: "The room code is invalid.", tr: "Oda kodu geçersiz.", ar: "رمز الغرفة غير صالح.", fr: "Le code du salon est invalide." },
    "این نسخه برای اتاق‌های کوچک تا {{n}} نفر تنظیم شده است.": { en: "This version supports small rooms of up to {{n}} people.", tr: "Bu sürüm en fazla {{n}} kişilik küçük odalar için ayarlanmıştır.", ar: "هذا الإصدار مُعدّ للغرف الصغيرة التي تضم حتى {{n}} أشخاص.", fr: "Cette version est prévue pour des salons de {{n}} personnes maximum." },
    "ابتدا وارد یک اتاق شوید.": { en: "Join a room first.", tr: "Önce bir odaya katılın.", ar: "انضم إلى غرفة أولًا.", fr: "Rejoignez d’abord un salon." },
    "کد": { en: "Code", tr: "Kod", ar: "الرمز", fr: "Code" },
    "وصل": { en: "Connected", tr: "Bağlı", ar: "متصل", fr: "Connecté" },
    "می‌تونم با آیفون تماس بگیرم؟": { en: "Can I call from an iPhone?", tr: "iPhone ile arama yapabilir miyim?", ar: "هل يمكنني الاتصال من iPhone؟", fr: "Puis-je appeler depuis un iPhone ?" },
    "در یک مرورگر به‌روز روی iPhone یا iPad، با اجازهٔ میکروفن و دوربین تماس بگیر. اشتراک‌گذاری صفحه به پشتیبانی مرورگر بستگی دارد.": { en: "On an up-to-date browser on iPhone or iPad, calls work after you allow microphone and camera access. Screen sharing depends on browser support.", tr: "Güncel bir iPhone veya iPad tarayıcısında mikrofon ve kamera izniyle arama yapabilirsin. Ekran paylaşımı tarayıcı desteğine bağlıdır.", ar: "يمكنك إجراء المكالمات عبر متصفح حديث على iPhone أو iPad بعد السماح بالميكروفون والكاميرا. تعتمد مشاركة الشاشة على دعم المتصفح.", fr: "Sur un navigateur récent sur iPhone ou iPad, les appels fonctionnent après autorisation du micro et de la caméra. Le partage d’écran dépend du navigateur." }
  };

  const locales = { fa: "fa-IR", en: "en-US", tr: "tr-TR", ar: "ar", fr: "fr-FR" };
  const rtlLanguages = new Set(["fa", "ar"]);
  const staticTexts = new WeakMap();
  const staticAttributes = new WeakMap();
  const dynamicElements = new Set();
  const supportedLanguages = new Set(["fa", "en", "tr", "ar", "fr"]);
  const languageSelect = document.querySelector("#languageSelect");
  let language = "fa";

  function t(source, values = {}) {
    const result = translations[source]?.[language] || source;
    return result.replace(/\{\{(\w+)\}\}/g, (_, key) => String(values[key] ?? ""));
  }

  function setText(element, source, values = {}) {
    if (!element) return;
    element.dataset.samikaDynamic = "true";
    element._samikaMessage = { source, values };
    dynamicElements.add(element);
    element.textContent = t(source, values);
  }

  function translateStaticText() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest("[data-samika-dynamic]")) continue;
      if (!staticTexts.has(node)) staticTexts.set(node, node.nodeValue);
      const source = staticTexts.get(node);
      const trimmed = source.trim();
      if (!trimmed) continue;
      const leading = source.match(/^\s*/)?.[0] || "";
      const trailing = source.match(/\s*$/)?.[0] || "";
      node.nodeValue = `${leading}${t(trimmed)}${trailing}`;
    }
  }

  function translateAttributes() {
    const attributes = ["aria-label", "placeholder", "title", "alt", "content"];
    document.querySelectorAll("*").forEach(element => {
      let saved = staticAttributes.get(element);
      if (!saved) { saved = new Map(); staticAttributes.set(element, saved); }
      attributes.forEach(attribute => {
        if (!element.hasAttribute(attribute)) return;
        if (!saved.has(attribute)) saved.set(attribute, element.getAttribute(attribute));
        element.setAttribute(attribute, t(saved.get(attribute)));
      });
    });
  }

  function setLanguage(nextLanguage, persist = true) {
    if (!supportedLanguages.has(nextLanguage)) nextLanguage = "fa";
    language = nextLanguage;
    document.documentElement.lang = language;
    document.documentElement.dir = rtlLanguages.has(language) ? "rtl" : "ltr";
    document.title = t("سامیکا | Samika — دورهمی آنلاین");
    translateStaticText();
    translateAttributes();
    if (languageSelect) languageSelect.value = language;
    const brandAlt = document.querySelector(".brand [data-brand-alt]");
    if (brandAlt) brandAlt.hidden = language !== "fa";
    document.querySelectorAll("[data-join]").forEach(element => {
      if (!element.dataset.joinSource) element.dataset.joinSource = element.dataset.join;
      element.dataset.join = t(element.dataset.joinSource);
    });
    document.querySelectorAll("[data-name]").forEach(element => {
      if (!element.dataset.nameSource) element.dataset.nameSource = element.dataset.name;
      element.dataset.name = t(element.dataset.nameSource);
    });
    dynamicElements.forEach(element => {
      if (!element.isConnected) { dynamicElements.delete(element); return; }
      const message = element._samikaMessage;
      if (message) element.textContent = t(message.source, message.values);
    });
    if (persist) {
      try { localStorage.setItem("samika-language", language); } catch {}
    }
    window.dispatchEvent(new CustomEvent("samika:languagechange", { detail: { language, direction: document.documentElement.dir } }));
  }

  if (languageSelect) languageSelect.addEventListener("change", () => setLanguage(languageSelect.value));
  let savedLanguage = "fa";
  try { savedLanguage = localStorage.getItem("samika-language") || "fa"; } catch {}
  setLanguage(supportedLanguages.has(savedLanguage) ? savedLanguage : "fa", false);
  window.SamikaI18n = Object.freeze({ t, setText, setLanguage, get language() { return language; }, get locale() { return locales[language]; } });
})();
