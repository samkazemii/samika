(() => {
  const translations = {
    "سامیکا | Samika — دورهمی آنلاین": { en: "Samika | Online Hangout", tr: "Samika | Çevrimiçi Buluşma", ar: "ساميكا | لقاء عبر الإنترنت", fr: "Samika | Salon en ligne" },
    "سامیکا": { en: "Samika", tr: "Samika", ar: "ساميكا", fr: "Samika" },
    "نصب": { en: "Install", tr: "Yükle", ar: "تثبيت", fr: "Installer" },
    "نصب سامیکا": { en: "Install Samika", tr: "Samika'yı yükle", ar: "ثبّت ساميكا", fr: "Installer Samika" },
    "چطور سامیکا را روی گوشی نصب کنم؟": { en: "How do I add Samika to my phone?", tr: "Samika'yı telefonuma nasıl eklerim?", ar: "كيف أضيف ساميكا إلى هاتفي؟", fr: "Comment ajouter Samika sur mon téléphone ?" },
    "نصب اختیاری است. در Safari آیفون یا آیپد، اشتراک‌گذاری و سپس افزودن به صفحهٔ اصلی را بزنید. در Chrome از منوی ⋮ گزینهٔ نصب یا افزودن به صفحهٔ اصلی را انتخاب کنید. برای تماس زنده اینترنت لازم است.": { en: "Installation is optional. In Safari on iPhone or iPad, tap Share, then Add to Home Screen. In Chrome, open ⋮ and choose Install app or Add to Home screen. Live calls need an internet connection.", tr: "Yükleme isteğe bağlıdır. iPhone veya iPad'de Safari'de Paylaş'a, ardından Ana Ekrana Ekle'ye dokunun. Chrome'da ⋮ menüsünden Uygulamayı yükle veya Ana ekrana ekle'yi seçin. Canlı görüşmeler için internet gerekir.", ar: "التثبيت اختياري. في Safari على iPhone أو iPad اضغط مشاركة ثم إضافة إلى الشاشة الرئيسية. في Chrome افتح ⋮ واختر تثبيت التطبيق أو إضافته إلى الشاشة الرئيسية. تحتاج المكالمات المباشرة إلى اتصال بالإنترنت.", fr: "L’installation est facultative. Dans Safari sur iPhone ou iPad, touchez Partager puis Sur l’écran d’accueil. Dans Chrome, ouvrez ⋮ puis choisissez Installer ou Ajouter à l’écran d’accueil. Les appels en direct nécessitent Internet." },
    "سامیکا روی دستگاه نصب شد": { en: "Samika was installed on this device", tr: "Samika bu cihaza yüklendi", ar: "تم تثبيت ساميكا على هذا الجهاز", fr: "Samika est installée sur cet appareil" },
    "درخواست نصب سامیکا پذیرفته شد": { en: "Samika install was accepted", tr: "Samika yükleme isteği kabul edildi", ar: "تم قبول تثبيت ساميكا", fr: "Installation de Samika acceptée" },
    "سامیکا از قبل روی دستگاه نصب است": { en: "Samika is already installed", tr: "Samika zaten yüklü", ar: "ساميكا مثبتة بالفعل", fr: "Samika est déjà installée" },
    "برای نصب: در Safari دکمهٔ اشتراک‌گذاری و افزودن به صفحهٔ اصلی را بزن؛ در Chrome از منوی ⋮ گزینهٔ نصب را انتخاب کن": { en: "To install: in Safari tap Share, then Add to Home Screen; in Chrome open ⋮ and choose Install app or Add to Home screen.", tr: "Yüklemek için Safari'de Paylaş'a, ardından Ana Ekrana Ekle'ye dokunun; Chrome'da ⋮ menüsünden Uygulamayı yükle veya Ana ekrana ekle'yi seçin.", ar: "للتثبيت: في Safari اضغط مشاركة ثم إضافة إلى الشاشة الرئيسية؛ وفي Chrome افتح ⋮ واختر تثبيت التطبيق أو إضافته إلى الشاشة الرئيسية.", fr: "Pour installer : dans Safari, touchez Partager puis Sur l’écran d’accueil ; dans Chrome, ouvrez ⋮ et choisissez Installer ou Ajouter à l’écran d’accueil." },
    "اتاق‌های اخیر": { en: "Recent rooms", tr: "Son odalar", ar: "الغرف الأخيرة", fr: "Salons récents" },
    "پاک‌کردن فهرست": { en: "Clear list", tr: "Listeyi temizle", ar: "مسح القائمة", fr: "Effacer la liste" },
    "این اتاق فقط در همین مرورگر ذخیره شده": { en: "This room is saved in this browser only", tr: "Bu oda yalnızca bu tarayıcıda kayıtlı", ar: "هذه الغرفة محفوظة في هذا المتصفح فقط", fr: "Ce salon est enregistré uniquement dans ce navigateur" },
    "بازکردن اتاق": { en: "Open room", tr: "Odayı aç", ar: "افتح الغرفة", fr: "Ouvrir le salon" },
    "کپی لینک": { en: "Copy link", tr: "Bağlantıyı kopyala", ar: "نسخ الرابط", fr: "Copier le lien" },
    "بازی": { en: "Games", tr: "Oyunlar", ar: "ألعاب", fr: "Jeux" },
    "بازی‌های گروهی": { en: "Group games", tr: "Grup oyunları", ar: "ألعاب جماعية", fr: "Jeux de groupe" },
    "همهٔ اعضای اتاق می‌توانند بازی کنند.": { en: "Everyone in the room can play together.", tr: "Odada bulunan herkes birlikte oynayabilir.", ar: "يمكن لجميع أعضاء الغرفة اللعب معًا.", fr: "Tous les membres du salon peuvent jouer ensemble." },
    "یک بازی را انتخاب کن تا همهٔ اعضای اتاق با هم بازی کنند.": { en: "Choose a game for everyone in the room.", tr: "Odadaki herkes için bir oyun seç.", ar: "اختر لعبة لجميع أعضاء الغرفة.", fr: "Choisissez un jeu pour tout le salon." },
    "❌⭕ دوز آنلاین": { en: "❌⭕ Tic-tac-toe", tr: "❌⭕ XOX", ar: "❌⭕ إكس-أو", fr: "❌⭕ Morpion" },
    "🔢 حدس عدد": { en: "🔢 Guess the number", tr: "🔢 Sayıyı tahmin et", ar: "🔢 خمن الرقم", fr: "🔢 Devinez le nombre" },
    "🎲 چالش خنده‌دار": { en: "🎲 Funny challenge", tr: "🎲 Eğlenceli meydan okuma", ar: "🎲 تحدٍّ مضحك", fr: "🎲 Défi amusant" },
    "شروع دوباره": { en: "Play again", tr: "Yeniden oyna", ar: "العب مجددًا", fr: "Rejouer" },
    "شروع دور تازه": { en: "Start a new round", tr: "Yeni tur başlat", ar: "ابدأ جولة جديدة", fr: "Nouvelle manche" },
    "ثبت حدس": { en: "Submit guess", tr: "Tahmini gönder", ar: "أرسل التخمين", fr: "Valider le nombre" },
    "شروع بازی": { en: "Start game", tr: "Oyunu başlat", ar: "ابدأ اللعبة", fr: "Lancer le jeu" },
    "منتظر بازیکن دوم هستیم…": { en: "Waiting for a second player…", tr: "İkinci oyuncu bekleniyor…", ar: "بانتظار لاعب ثانٍ…", fr: "En attente d’un deuxième joueur…" },
    "بازی مساوی شد!": { en: "It's a draw!", tr: "Berabere!", ar: "تعادل!", fr: "Match nul !" },
    "برنده: {{name}}": { en: "Winner: {{name}}", tr: "Kazanan: {{name}}", ar: "الفائز: {{name}}", fr: "Gagnant : {{name}}" },
    "نوبت {{name}}": { en: "{{name}}'s turn", tr: "Sıra {{name}}'de", ar: "دور {{name}}", fr: "Au tour de {{name}}" },
    "بازیکن اول": { en: "Player one", tr: "Birinci oyuncu", ar: "اللاعب الأول", fr: "Joueur 1" },
    "بازیکن دوم": { en: "Player two", tr: "İkinci oyuncu", ar: "اللاعب الثاني", fr: "Joueur 2" },
    "X: {{name}}": { en: "X: {{name}}", tr: "X: {{name}}", ar: "X: {{name}}", fr: "X : {{name}}" },
    "O: {{name}}": { en: "O: {{name}}", tr: "O: {{name}}", ar: "O: {{name}}", fr: "O : {{name}}" },
    "یک عدد بین ۱ تا ۵۰ را پیدا کنید.": { en: "Guess the number from 1 to 50.", tr: "1 ile 50 arasındaki sayıyı bulun.", ar: "خمنوا رقمًا بين ١ و٥٠.", fr: "Trouvez le nombre entre 1 et 50." },
    "تعداد حدس‌ها: {{count}}": { en: "Guesses: {{count}}", tr: "Tahmin sayısı: {{count}}", ar: "عدد التخمينات: {{count}}", fr: "Essais : {{count}}" },
    "{{name}} عدد را پیدا کرد!": { en: "{{name}} found the number!", tr: "{{name}} sayıyı buldu!", ar: "{{name}} وجد الرقم!", fr: "{{name}} a trouvé le nombre !" },
    "{{name}} حدس زد {{value}}؛ {{hint}}": { en: "{{name}} guessed {{value}}; {{hint}}", tr: "{{name}} {{value}} tahminini yaptı; {{hint}}", ar: "خمن {{name}} الرقم {{value}}؛ {{hint}}", fr: "{{name}} a proposé {{value}} ; {{hint}}" },
    "عدد کوچک‌تری بگو": { en: "Try a lower number", tr: "Daha küçük bir sayı dene", ar: "جرّب رقمًا أصغر", fr: "Essayez plus petit" },
    "عدد بزرگ‌تری بگو": { en: "Try a higher number", tr: "Daha büyük bir sayı dene", ar: "جرّب رقمًا أكبر", fr: "Essayez plus grand" },
    "چالش بعدی": { en: "Next challenge", tr: "Sıradaki meydan okuma", ar: "التحدي التالي", fr: "Défi suivant" },
    "انتخاب‌کننده: {{name}}": { en: "Picked by: {{name}}", tr: "Seçen: {{name}}", ar: "اختارها: {{name}}", fr: "Choisi par : {{name}}" },
    "در یک جمله از حال امروزت بگو": { en: "Describe your day in one sentence", tr: "Gününü tek cümleyle anlat", ar: "صف يومك بجملة واحدة", fr: "Décrivez votre journée en une phrase" },
    "با سه ایموجی روزت را تعریف کن": { en: "Describe your day with three emojis", tr: "Gününü üç emojiyle anlat", ar: "صف يومك بثلاثة رموز تعبيرية", fr: "Décrivez votre journée avec trois émojis" },
    "یک خاطرهٔ خنده‌دار تعریف کن": { en: "Tell a funny story", tr: "Komik bir anı anlat", ar: "احكِ قصة مضحكة", fr: "Racontez une anecdote drôle" },
    "از یکی از اعضای اتاق تعریف کن": { en: "Give someone in the room a compliment", tr: "Odadaki birine iltifat et", ar: "امدح أحد أعضاء الغرفة", fr: "Faites un compliment à quelqu’un du salon" },
    "یک آهنگ را زمزمه کن تا بقیه حدس بزنند": { en: "Hum a song for everyone to guess", tr: "Başkalarının tahmin etmesi için bir şarkı mırıldan", ar: "دندن أغنية ليخمنها الآخرون", fr: "Fredonnez une chanson à deviner" },
    "یک ادای بامزه دربیاور": { en: "Do a funny impression", tr: "Komik bir taklit yap", ar: "قلّد شيئًا بطريقة مضحكة", fr: "Faites une imitation amusante" },
    "واکنش‌های سریع": { en: "Quick reactions", tr: "Hızlı tepkiler", ar: "تفاعلات سريعة", fr: "Réactions rapides" },
    "خنده": { en: "Laugh", tr: "Gül", ar: "ضحك", fr: "Rire" },
    "گریه": { en: "Cry", tr: "Ağla", ar: "بكاء", fr: "Pleurer" },
    "قلب": { en: "Heart", tr: "Kalp", ar: "قلب", fr: "Cœur" },
    "تعجب": { en: "Surprised", tr: "Şaşkın", ar: "مندهش", fr: "Surpris" },
    "آتش": { en: "Fire", tr: "Ateş", ar: "نار", fr: "Feu" },
    "آفرین": { en: "Clap", tr: "Alkış", ar: "تصفيق", fr: "Bravo" },
    "تصویر و صدای صفحه برای اتاق فرستاده می‌شود": { en: "Screen video and audio are being shared with the room.", tr: "Ekran görüntüsü ve sesi odayla paylaşılıyor.", ar: "تتم مشاركة صورة الشاشة وصوتها مع الغرفة.", fr: "L’image et le son de l’écran sont partagés avec le salon." },
    "تصویر شیر شد؛ این دستگاه صدای صفحه را نداد. برای صدای Instagram، میکروفن و بلندگوی گوشی را روشن کن": { en: "The screen is shared, but this device did not provide system audio. For Instagram audio, turn on the phone speaker and Samika microphone, or share a video link instead.", tr: "Ekran paylaşıldı ancak bu cihaz sistem sesini vermedi. Instagram sesi için telefon hoparlörünü ve Samika mikrofonunu açın ya da video bağlantısını paylaşın.", ar: "تمت مشاركة الشاشة لكن هذا الجهاز لم يرسل صوت النظام. لصوت Instagram شغّل مكبر الهاتف وميكروفون ساميكا، أو شارك رابط الفيديو.", fr: "L’écran est partagé, mais l’appareil ne fournit pas le son système. Pour le son Instagram, activez le haut-parleur et le micro Samika, ou partagez un lien vidéo." },
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
    "دیدن ایده‌های دورهمی": { en: "Browse hangout ideas", tr: "Buluşma fikirlerine bak", ar: "تصفّح أفكار اللقاءات", fr: "Voir des idées de rencontre" },
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
    "ایده‌های دورهمی": { en: "Hangout ideas", tr: "Buluşma fikirleri", ar: "أفكار اللقاءات", fr: "Idées de rencontre" },
    "یک حال‌وهوا انتخاب کن و اتاق خصوصی بساز": { en: "Choose a vibe and create a private room", tr: "Bir ortam seç ve özel oda oluştur", ar: "اختر أجواءً وأنشئ غرفة خاصة", fr: "Choisissez une ambiance et créez un salon privé" },
    "+ ساخت اتاق": { en: "+ Create room", tr: "+ Oda oluştur", ar: "+ إنشاء غرفة", fr: "+ Créer un salon" },
    "همه": { en: "All", tr: "Tümü", ar: "الكل", fr: "Tout" },
    "فیلم و ویدئو": { en: "Movies and video", tr: "Film ve video", ar: "الأفلام والفيديو", fr: "Films et vidéos" },
    "بازی": { en: "Games", tr: "Oyun", ar: "ألعاب", fr: "Jeux" },
    "گپ‌وگفت": { en: "Chat", tr: "Sohbet", ar: "دردشة", fr: "Discussion" },
    "🎬 تماشای فیلم": { en: "🎬 Movie night", tr: "🎬 Film gecesi", ar: "🎬 مشاهدة فيلم", fr: "🎬 Cinéma" },
    "پیشنهاد": { en: "Idea", tr: "Öneri", ar: "اقتراح", fr: "Idée" },
    "شب فیلم و پاپ‌کورن": { en: "Movie night and popcorn", tr: "Film ve patlamış mısır gecesi", ar: "ليلة فيلم وفشار", fr: "Soirée film et pop-corn" },
    "یک فیلم خوب، حال خوب‌تر 🍿": { en: "A good movie, an even better mood 🍿", tr: "Güzel bir film, daha güzel bir keyif 🍿", ar: "فيلم جميل ومزاج أجمل 🍿", fr: "Un bon film, encore meilleure humeur 🍿" },
    "ساختهٔ سارا": { en: "Hosted by Sara", tr: "Sara'nın odası", ar: "من تنظيم سارة", fr: "Par Sara" },
    "ساخت اتاق ←": { en: "Create room →", tr: "Oda oluştur →", ar: "أنشئ غرفة ←", fr: "Créer un salon →" },
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
    "برای هر اتاق یک کد دعوت تصادفی و غیرقابل حدس ساخته می‌شود و فهرست عمومی وجود ندارد. هرکس لینک دعوت را داشته باشد می‌تواند وارد شود؛ لینک را فقط برای افراد مورداعتماد بفرستید.": { en: "Every room gets a long, random invite code and there is no public room directory. Anyone with the invite link can enter, so share it only with people you trust.", tr: "Her oda uzun ve rastgele bir davet kodu alır; herkese açık oda listesi yoktur. Davet bağlantısına sahip olan herkes girebilir, bu yüzden yalnızca güvendiğiniz kişilerle paylaşın.", ar: "تحصل كل غرفة على رمز دعوة طويل وعشوائي ولا يوجد دليل عام للغرف. يمكن لأي شخص يملك رابط الدعوة الدخول، لذا شاركه مع أشخاص تثق بهم فقط.", fr: "Chaque salon reçoit un long code d’invitation aléatoire et aucun annuaire public n’existe. Toute personne ayant le lien peut entrer : partagez-le uniquement avec des personnes de confiance." },
    "آیا دوستانم تصویر و صدای هم را می‌بینند؟": { en: "Can my friends see and hear me?", tr: "Arkadaşlarım beni görebilir ve duyabilir mi?", ar: "هل يستطيع أصدقائي رؤيتي وسماعي؟", fr: "Mes amis peuvent-ils me voir et m’entendre ?" },
    "بله. بعد از ورود به اتاق، دکمهٔ میکروفن یا دوربین را بزنید و اجازهٔ مرورگر را بدهید. رسانه مستقیم با WebRTC بین مرورگرها منتقل می‌شود؛ سامیکا آن را ضبط نمی‌کند.": { en: "Yes. Join a room, turn on your microphone or camera, and allow browser access. WebRTC sends media directly between browsers; Samika does not record it.", tr: "Evet. Odaya katılın, mikrofonu veya kamerayı açın ve tarayıcı izni verin. WebRTC medyayı tarayıcılar arasında doğrudan iletir; Samika kayıt yapmaz.", ar: "نعم. انضم إلى الغرفة وشغّل الميكروفون أو الكاميرا واسمح للمتصفح بالوصول. ينقل WebRTC الوسائط مباشرةً بين المتصفحات ولا يسجلها ساميكا.", fr: "Oui. Rejoignez un salon, activez le micro ou la caméra et autorisez le navigateur. WebRTC transmet les médias directement entre navigateurs ; Samika ne les enregistre pas." },
    "همه می‌توانند ویدئو را هم‌زمان تماشا کنند؟": { en: "Can everyone watch a video together?", tr: "Herkes aynı videoyu birlikte izleyebilir mi?", ar: "هل يمكن للجميع مشاهدة الفيديو معًا؟", fr: "Tout le monde peut-il regarder une vidéo ensemble ?" },
    "لینک مستقیم HTTPS ویدئوی MP4 یا WebM، یا لینک YouTube را در نوار بالای اتاق وارد کنید. همه می‌توانند پخش را کنترل و ویدئو را جلو یا عقب ببرند. هر دستگاه ویدئو را جداگانه از منبع اصلی می‌گیرد؛ سرعت و تأخیر به اینترنت و خود سایت ویدئو بستگی دارد.": { en: "Enter a direct HTTPS MP4/WebM link or a YouTube link in the room bar. Everyone can control playback and seek. Each device streams from the original provider, so buffering and delay depend on the network and video site.", tr: "Oda çubuğuna doğrudan HTTPS MP4/WebM bağlantısı veya YouTube bağlantısı girin. Herkes oynatmayı ve ileri-geri almayı kontrol edebilir. Her cihaz videoyu kaynağından alır; bekleme ve gecikme ağa ve video sitesine bağlıdır.", ar: "أدخل رابط HTTPS مباشرًا لفيديو MP4 أو WebM أو رابط YouTube في شريط الغرفة. يمكن للجميع التحكم بالتشغيل والتقديم والإرجاع. يبث كل جهاز من المصدر الأصلي، لذا يعتمد التخزين المؤقت والتأخير على الشبكة وموقع الفيديو.", fr: "Saisissez dans la barre du salon un lien HTTPS direct MP4/WebM ou un lien YouTube. Tout le monde peut contrôler la lecture et avancer ou reculer. Chaque appareil lit la vidéo depuis sa source : le chargement et le délai dépendent du réseau et du site." },
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
    "برای شروع اشتراک صفحه از دسکتاپ و Chrome یا Edge استفاده کن؛ با گوشی می‌توانی تصویر دریافتی را بزرگ کنی": { en: "Start screen sharing from a desktop browser such as Chrome or Edge. On your phone, you can enlarge a shared screen you receive.", tr: "Ekran paylaşımını Chrome veya Edge gibi bir masaüstü tarayıcısından başlat. Telefonunda sana paylaşılan ekranı büyütebilirsin.", ar: "ابدأ مشاركة الشاشة من متصفح سطح مكتب مثل Chrome أو Edge. يمكنك تكبير الشاشة التي تستقبلها على هاتفك.", fr: "Lancez le partage depuis un navigateur de bureau comme Chrome ou Edge. Sur votre téléphone, vous pouvez agrandir un écran reçu." },
    "از پنجرهٔ انتخاب مرورگر، تب یا پنجرهٔ برنامهٔ ویدئو را انتخاب کن؛ برای صدای ویدئو، اشتراک تب مرورگر را انتخاب کن": { en: "In the browser picker, choose the video tab or app window. To include video audio, choose a browser tab.", tr: "Tarayıcı seçim penceresinde video sekmesini veya uygulama penceresini seç. Video sesini de göndermek için tarayıcı sekmesini paylaş.", ar: "من نافذة اختيار المتصفح، اختر تبويب الفيديو أو نافذة التطبيق. لمشاركة صوت الفيديو، اختر تبويب المتصفح.", fr: "Dans le sélecteur du navigateur, choisissez l’onglet vidéo ou la fenêtre de l’application. Pour inclure le son, choisissez un onglet du navigateur." },
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
    "سلام، به سامیکا خوش آمدید! امیدوارم کنار دوستانتان لحظات خوبی داشته باشید. — سام کاظمی ✨": { en: "Welcome to Samika! I hope you have a wonderful time here with your friends. — Sam Kazemi ✨", tr: "Samika'ya hoş geldiniz! Arkadaşlarınızla burada güzel vakit geçirmenizi dilerim. — Sam Kazemi ✨", ar: "أهلًا بكم في ساميكا! أتمنى لكم وقتًا ممتعًا مع أصدقائكم. — سام كاظمي ✨", fr: "Bienvenue sur Samika ! Je vous souhaite de bons moments avec vos amis. — Sam Kazemi ✨" },
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
    "در یک مرورگر به‌روز روی iPhone یا iPad، با اجازهٔ میکروفن و دوربین تماس بگیر. اشتراک‌گذاری صفحه به پشتیبانی مرورگر بستگی دارد.": { en: "On an up-to-date browser on iPhone or iPad, calls work after you allow microphone and camera access. Screen sharing depends on browser support.", tr: "Güncel bir iPhone veya iPad tarayıcısında mikrofon ve kamera izniyle arama yapabilirsin. Ekran paylaşımı tarayıcı desteğine bağlıdır.", ar: "يمكنك إجراء المكالمات عبر متصفح حديث على iPhone أو iPad بعد السماح بالميكروفون والكاميرا. تعتمد مشاركة الشاشة على دعم المتصفح.", fr: "Sur un navigateur récent sur iPhone ou iPad, les appels fonctionnent après autorisation du micro et de la caméra. Le partage d’écran dépend du navigateur." },
    "برای ورود به «{{room}}»، نام کاربری‌ات را وارد کن.": { en: "Enter a username to join “{{room}}”.", tr: "“{{room}}” odasına katılmak için bir kullanıcı adı gir.", ar: "أدخل اسم مستخدم للانضمام إلى «{{room}}». ", fr: "Saisissez un nom d’utilisateur pour rejoindre « {{room}} »." },
    "نام کاربری شما (اجباری)": { en: "Your username (required)", tr: "Kullanıcı adınız (zorunlu)", ar: "اسم المستخدم (مطلوب)", fr: "Votre nom d’utilisateur (obligatoire)" },
    "اتاق خصوصی ساخته می‌شود و فقط با لینک دعوت می‌توان واردش شد.": { en: "Rooms are private and can only be joined with an invite link.", tr: "Odalar özeldir ve yalnızca davet bağlantısıyla katılınabilir.", ar: "الغرف خاصة ولا يمكن الانضمام إليها إلا عبر رابط دعوة.", fr: "Les salons sont privés et accessibles uniquement avec un lien d’invitation." },
    "ساخت اتاق خصوصی و ادامه ←": { en: "Create private room →", tr: "Özel oda oluştur →", ar: "أنشئ غرفة خاصة ←", fr: "Créer un salon privé →" },
    "ورود به اتاق خصوصی ←": { en: "Join private room →", tr: "Özel odaya katıl →", ar: "انضم إلى الغرفة الخاصة ←", fr: "Rejoindre le salon privé →" },
    "لینک YouTube یا ویدئوی مستقیم MP4/WebM": { en: "YouTube or direct MP4/WebM video link", tr: "YouTube veya doğrudan MP4/WebM video bağlantısı", ar: "رابط YouTube أو رابط مباشر لفيديو MP4/WebM", fr: "Lien YouTube ou vidéo directe MP4/WebM" },
    "لینک ویدئو برای همه": { en: "Video link for everyone", tr: "Herkes için video bağlantısı", ar: "رابط الفيديو للجميع", fr: "Lien vidéo pour tout le monde" },
    "ادمین اتاق": { en: "Room admin", tr: "Oda yöneticisi", ar: "مدير الغرفة", fr: "Admin du salon" },
    "ادمین اتاق · شما": { en: "Room admin · You", tr: "Oda yöneticisi · Siz", ar: "مدير الغرفة · أنت", fr: "Admin du salon · Vous" },
    "برای ادمین‌کردن کلیک کن": { en: "Click to make admin", tr: "Yönetici yapmak için tıklayın", ar: "انقر للتعيين مديرًا", fr: "Cliquez pour nommer admin" },
    "برای ادمین‌کردن {{name}} کلیک کن": { en: "Click to make {{name}} an admin", tr: "{{name}} kişisini yönetici yapmak için tıklayın", ar: "انقر لتعيين {{name}} مديرًا", fr: "Cliquez pour nommer {{name}} admin" },
    "فقط ادمین می‌تواند ویدئو را تغییر دهد": { en: "Only an admin can change the video", tr: "Videoyu yalnızca yönetici değiştirebilir", ar: "المدير فقط يمكنه تغيير الفيديو", fr: "Seul un admin peut changer la vidéo" },
    "کنترل دست ادمین": { en: "Admin controls", tr: "Yönetici kontrolü", ar: "تحكم المدير", fr: "Contrôles admin" },
    "تنها ادمین‌های اتاق اجازهٔ کنترل ویدئو و مدیریت اعضا را دارند.": { en: "Only room admins can control the video and manage members.", tr: "Videoyu yalnızca oda yöneticileri kontrol edebilir ve üyeleri yönetebilir.", ar: "مديرو الغرفة فقط يمكنهم التحكم بالفيديو وإدارة الأعضاء.", fr: "Seuls les admins du salon peuvent contrôler la vidéo et gérer les membres." },
    "شما ادمین اتاق شدید": { en: "You are now a room admin", tr: "Artık oda yöneticisisiniz", ar: "أصبحت مديرًا للغرفة", fr: "Vous êtes maintenant admin du salon" },
    "{{name}} ادمین اتاق شد": { en: "{{name}} is now a room admin", tr: "{{name}} artık oda yöneticisi", ar: "أصبح {{name}} مديرًا للغرفة", fr: "{{name}} est maintenant admin du salon" },
    "پخش برای همه": { en: "Play for everyone", tr: "Herkes için oynat", ar: "شغّل للجميع", fr: "Lire pour tout le monde" },
    "پخش / توقف": { en: "Play / pause", tr: "Oynat / duraklat", ar: "تشغيل / إيقاف مؤقت", fr: "Lire / pause" },
    "پخش ویدئو": { en: "Play video", tr: "Videoyu oynat", ar: "شغّل الفيديو", fr: "Lire la vidéo" },
    "توقف ویدئو": { en: "Pause video", tr: "Videoyu duraklat", ar: "أوقف الفيديو مؤقتًا", fr: "Mettre la vidéo en pause" },
    "تمام‌صفحه": { en: "Fullscreen", tr: "Tam ekran", ar: "ملء الشاشة", fr: "Plein écran" },
    "تمام‌صفحه‌کردن تصویر": { en: "Make video full screen", tr: "Videoyu tam ekran yap", ar: "اجعل الفيديو بملء الشاشة", fr: "Afficher la vidéo en plein écran" },
    "خروج از تمام‌صفحه": { en: "Exit full screen", tr: "Tam ekrandan çık", ar: "الخروج من ملء الشاشة", fr: "Quitter le plein écran" },
    "بستن ویدئوی مشترک": { en: "Close shared video", tr: "Paylaşılan videoyu kapat", ar: "أغلق الفيديو المشترك", fr: "Fermer la vidéo partagée" },
    "جلو یا عقب بردن ویدئو": { en: "Seek video", tr: "Videoda ileri veya geri git", ar: "تقديم الفيديو أو إرجاعه", fr: "Avancer ou reculer dans la vidéo" },
    "نام کاربری اجباری است.": { en: "A username is required.", tr: "Kullanıcı adı zorunludur.", ar: "اسم المستخدم مطلوب.", fr: "Un nom d’utilisateur est obligatoire." },
    "نام کاربری را وارد کن تا بتوانی وارد اتاق شوی": { en: "Enter a username before joining the room.", tr: "Odaya katılmadan önce kullanıcı adını gir.", ar: "أدخل اسم مستخدم قبل الانضمام إلى الغرفة.", fr: "Saisissez un nom d’utilisateur avant de rejoindre le salon." },
    "اتاق خصوصی سامیکا ساخته شد؛ لینک دعوت را فقط برای افراد موردنظرت بفرست": { en: "Private room created. Send the invite link only to people you choose.", tr: "Özel oda oluşturuldu. Davet bağlantısını yalnızca seçtiğin kişilerle paylaş.", ar: "تم إنشاء غرفة خاصة. أرسل رابط الدعوة فقط للأشخاص الذين تختارهم.", fr: "Salon privé créé. Envoyez le lien uniquement aux personnes de votre choix." },
    "برای کنترل ویدئوی مشترک، اول به اتاق وصل شو": { en: "Connect to the room before controlling its shared video.", tr: "Paylaşılan videoyu kontrol etmeden önce odaya bağlan.", ar: "اتصل بالغرفة قبل التحكم بالفيديو المشترك.", fr: "Connectez-vous au salon avant de contrôler la vidéo partagée." },
    "لینک پشتیبانی نمی‌شود؛ لینک YouTube یا مستقیم MP4/WebM بده": { en: "Unsupported link. Use YouTube or a direct MP4/WebM link.", tr: "Desteklenmeyen bağlantı. YouTube veya doğrudan MP4/WebM bağlantısı kullan.", ar: "الرابط غير مدعوم. استخدم YouTube أو رابط MP4/WebM مباشرًا.", fr: "Lien non pris en charge. Utilisez YouTube ou un lien direct MP4/WebM." },
    "لینک پشتیبانی نمی‌شود؛ لینک YouTube یا ویدئوی مستقیم MP4/WebM بده.": { en: "Unsupported link. Use YouTube or a direct MP4/WebM video link.", tr: "Desteklenmeyen bağlantı. YouTube veya doğrudan MP4/WebM video bağlantısı kullan.", ar: "الرابط غير مدعوم. استخدم YouTube أو رابط فيديو MP4/WebM مباشرًا.", fr: "Lien non pris en charge. Utilisez YouTube ou un lien vidéo direct MP4/WebM." },
    "این لینک ویدئو پخش نمی‌شود؛ لینک مستقیم HTTPS از MP4 یا WebM بده": { en: "This video link cannot be played. Use a direct HTTPS MP4 or WebM link.", tr: "Bu video bağlantısı oynatılamıyor. Doğrudan HTTPS MP4 veya WebM bağlantısı kullan.", ar: "لا يمكن تشغيل رابط الفيديو هذا. استخدم رابط HTTPS مباشرًا لملف MP4 أو WebM.", fr: "Ce lien vidéo ne peut pas être lu. Utilisez un lien HTTPS direct MP4 ou WebM." },
    "این ویدئوی YouTube اجازهٔ پخش در سایت‌های دیگر را نمی‌دهد": { en: "This YouTube video does not allow playback on other sites.", tr: "Bu YouTube videosu başka sitelerde oynatmaya izin vermiyor.", ar: "لا يسمح فيديو YouTube هذا بتشغيله على مواقع أخرى.", fr: "Cette vidéo YouTube n’autorise pas la lecture sur d’autres sites." },
    "پخش‌کنندهٔ YouTube بارگیری نشد؛ اتصال اینترنت را بررسی کن": { en: "The YouTube player did not load. Check your internet connection.", tr: "YouTube oynatıcısı yüklenmedi. İnternet bağlantını kontrol et.", ar: "لم يتم تحميل مشغل YouTube. تحقق من اتصال الإنترنت.", fr: "Le lecteur YouTube n’a pas chargé. Vérifiez votre connexion Internet." },
    "برای شروع ویدئو، دکمهٔ پخش را در این دستگاه بزن": { en: "Tap play on this device to start the video.", tr: "Videoyu başlatmak için bu cihazda oynat düğmesine dokun.", ar: "اضغط تشغيل على هذا الجهاز لبدء الفيديو.", fr: "Appuyez sur lecture sur cet appareil pour démarrer la vidéo." },
    "برای پخش، دوباره دکمهٔ پخش را بزن": { en: "Tap play again to start playback.", tr: "Oynatmayı başlatmak için tekrar dokun.", ar: "اضغط تشغيل مرة أخرى لبدء العرض.", fr: "Appuyez à nouveau sur lecture pour démarrer." },
    "تمام‌صفحه در این مرورگر در دسترس نیست": { en: "Fullscreen is unavailable in this browser.", tr: "Bu tarayıcıda tam ekran kullanılamıyor.", ar: "ملء الشاشة غير متاح في هذا المتصفح.", fr: "Le plein écran n’est pas disponible dans ce navigateur." },
    "جست‌وجوی ایده...": { en: "Search ideas…", tr: "Fikir ara…", ar: "ابحث عن أفكار…", fr: "Rechercher des idées…" },
    "جست‌وجوی ایده": { en: "Search ideas", tr: "Fikir ara", ar: "ابحث عن أفكار", fr: "Rechercher des idées" }
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
