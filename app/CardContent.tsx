'use client';

export type Lang = 'fr' | 'ar';

export const translations = {
  fr: {
    heroTitle: 'Créez votre carte de membre AEMM',
    heroSubtitle: "Rejoignez l'Association des étudiants mauritaniens au Maroc et obtenez votre carte de membre officielle, votre précieux sésame pour bénéficier de tous nos services et participer à l'ensemble de nos activités et événements.",
    heroCta: 'Créer ma carte',
    howTitle: 'Comment créer votre carte',
    step1Title: 'Remplissez vos informations',
    step1Desc: 'Entrez votre nom, numéro de membre et ville',
    step2Title: 'Ajoutez votre photo',
    step2Desc: "Téléchargez une photo d'identité claire",
    step3Title: 'Envoyez votre demande',
    step3Desc: "Soumettez votre demande avec le justificatif de paiement",
    aboutTitle: "À propos de l'AEMM",
    aboutDesc1: "L'Association des Étudiants Mauritaniens au Maroc (AEMM) est une organisation dédiée à l'accueil, l'accompagnement et la réussite des étudiants mauritaniens au Maroc.",
    aboutDesc2: "Nous créons un réseau solide de solidarité, d'entraide académique et de développement professionnel pour tous nos membres.",
    title: 'Carte AEMM',
    subtitle: 'Remplissez les informations pour soumettre votre demande de carte',
    photoLabel: 'Photo du membre',
    photoText: 'Cliquez pour ajouter une photo',
    removePhoto: ' Supprimer la photo',
    nameLabel: 'Nom complet',
    namePlaceholder: 'Ex : Mohamed Abdelkader Tolba',
    numberLabel: 'Numéro membre',
    numberPlaceholder: 'Votre numéro WhatsApp',
    cityLabel: 'Ville',
    whatsappLabel: 'Numéro WhatsApp',
    whatsappPlaceholder: 'Votre numéro WhatsApp',
    paymentLabel: 'Capture du paiement',
    paymentText: 'Cliquez pour ajouter la capture',
    removePayment: ' Supprimer la capture',
    download: 'Envoyer ma demande',
    success: ' Demande envoyée avec succès !',
    successDesc: "Votre demande est en cours de traitement. Vous recevrez votre carte via WhatsApp sous peu.",
    error: "Erreur lors de l'envoi",
    cardBadge: 'CARTE OFFICIELLE',
    cardTitle1: 'Association des Étudiants',
    cardTitle2: 'Mauritaniens au Maroc',
    cardDesc: "Une communauté dédiée à l'accueil, l'accompagnement et la réussite des étudiants mauritaniens au Maroc, au sein d'un réseau solidaire, académique et professionnel.",
    cardTag: 'Solidarité · Réussite · Excellence',
    perk1: 'Accès privilégié aux événements, conférences et ateliers',
    perk2: 'Mise en relation avec des étudiants, diplômés et professionnels',
    perk3: 'Accompagnement académique, mentorat et soutien personnalisé',
    labelName: 'NOM DU MEMBRE',
    labelNumber: 'N° MEMBRE',
    labelCity: 'VILLE',
    labelContact: 'RÉSEAUX & CONTACT',
    issued: 'Émise le',
    expires: "Valable jusqu'au",
    sgLabel: 'Président ',
    dir: 'ltr' as const,
  },
  ar: {
    heroTitle: 'أنشئ بطاقة عضويتك في الرابطة',
    heroSubtitle: 'انضم إلى رابطة الطلاب الموريتانيين في المغرب، واحصل على بطاقتك الرسمية التي تثبت عضويتك، وتتيح لك الاستفادة من خدمات الرابطة   و المشاركة في جميع الأنشطة و الفعاليات.',
    heroCta: 'إنشاء بطاقتي',
    howTitle: 'كيفية إنشاء بطاقتك',
    step1Title: 'أدخل معلوماتك',
    step1Desc: 'أدخل اسمك ورقم العضوية والمدينة',
    step2Title: 'أضف صورتك',
    step2Desc: 'حمّل صورة هوية واضحة',
    step3Title: 'أرسل طلبك',
    step3Desc: 'قدّم طلبك مع إثبات الدفع',
    aboutTitle: 'عن الرابطة',
    aboutDesc1: ' رابطة الطلاب الموريتانيين في المغرب (AEMM) هي إطار طلابي جامع، يُعنى بالدفاع عن حقوق ومصالح الطلاب الموريتانيين بالمملكة المغربية، ومواكبة قضاياهم الأكاديمية والاجتماعية والإدارية.',
    aboutDesc2: 'تعمل الرابطة على ترسيخ قيم التضامن والوحدة الطلابية، وتعزيز صوت الطالب الموريتاني، بما يضمن له التمثيل اللائق، والدعم المستمر، وظروفًا أفضل للتحصيل و التميز الأكاديمي.',
    title: 'بطاقة AEMM',
    subtitle: 'أدخل معلوماتك لتقديم طلب بطاقتك الرسمية',
    photoLabel: 'صورة العضو',
    photoText: 'انقر لإضافة صورة',
    removePhoto: ' حذف الصورة',
    nameLabel: 'الاسم الكامل',
    namePlaceholder: 'مثال: محمد عبد القادر طلبه',
    numberLabel: 'رقم العضو',
    numberPlaceholder: 'رقمواتساب الخاص بك',
    cityLabel: 'المدينة',
    whatsappLabel: 'رقم واتساب',
    whatsappPlaceholder: 'رقم واتساب الخاص بك',
    paymentLabel: 'صورة إثبات الدفع',
    paymentText: 'انقر لإضافة صورة الدفع',
    removePayment: ' حذف صورة الدفع',
    download: 'إرسال الطلب  ',
    success: ' تم إرسال الطلب بنجاح!',
    successDesc: 'طلبك قيد المعالجة. ستتلقى بطاقتك عبر واتساب قريباً.',
    error: 'خطأ في الإرسال',
    cardBadge: 'البطاقة الرسمية',
    cardTitle1: ' رابطة الطلاب الموريتانيين',
    cardTitle2: 'في المغرب',
    cardDesc: 'مجتمع مكرّس لاستقبال الطلاب الموريتانيين ومرافقتهم ودعم نجاحهم في المغرب، في إطار شبكة تضامنية أكاديمية ومهنية.',
    cardTag: 'تضامن · نجاح · تميّز',
    perk1: 'وصول مميز إلى الفعاليات والمؤتمرات وورش العمل',
    perk2: 'التواصل مع الطلاب والخريجين والمهنيين',
    perk3: 'الدعم الأكاديمي والإرشاد والمساندة الشخصية',
    labelName: 'اسم العضو',
    labelNumber: 'رقم العضو',
    labelCity: 'المدينة',
    labelContact: 'التواصل والشبكات',
    issued: 'تاريخ الإصدار',
    expires: 'صالحة إلى غاية',
    sgLabel: 'الرئيس ',
    dir: 'rtl' as const,
  },
};

export const superviseursGeneraux = {
  Rabat: {
    fr: { ville: 'Rabat', nom: 'Mohamed Abdelkader Tolba' },
    ar: { ville: 'الرباط', nom: 'محمد عبد القادر الطلبه   ' },
    telephone: '+222 36 42 71 79',
  },
  Settat: {
    fr: { ville: 'Settat', nom: 'Cheikh Mohamed Vadel' },
    ar: { ville: 'سطات', nom: 'الشيخ محمد فاضل' },
    telephone: '+212 646 848 691',
  },
  Meknès: {
    fr: { ville: 'Meknès', nom: 'El boukhari Ahmed Val Elemin' },
    ar: { ville: 'مكناس', nom: 'البخاري أحمد فال ليمين' },
    telephone: '+222 27 85 27 09',
  },
  Fès: {
    fr: { ville: 'Fès', nom: 'Nouh Zoubier' },
    ar: { ville: 'فاس', nom: 'نوح الزبير' },
    telephone: '+222 49 69 27 95',
  },
  Kénitra: {
    fr: { ville: 'Kénitra', nom: 'Cheikhna' },
    ar: { ville: 'القنيطرة', nom: 'الشيخنا' },
    telephone: '+222 38 32 05 32',
  },
  'El Jadida': {
    fr: { ville: 'El Jadida', nom: 'Ali Cheikh' },
    ar: { ville: 'الجديدة', nom: 'علي الشيخ' },
    telephone: '+222 48 86 01 90',
  },
  Marrakech: {
    fr: { ville: 'Marrakech', nom: 'Yebe Ebnou' },
    ar: { ville: 'مراكش', nom: 'يبه ابنو' },
    telephone: '+212 64 28 10 31',
  },
  Tétouan: {
    fr: { ville: 'Tétouan', nom: 'Mohamed Salem Etvagha Oubeid' },
    ar: { ville: 'تطوان', nom: 'محمد سالم اتفاق عبيد' },
    telephone: '+212 62 18 87 48',
  },
  Tanger: {
    fr: { ville: 'Tanger', nom: 'Boubacar Diagne' },
    ar: { ville: 'طنجة', nom: 'بوبكر ديانغ' },
    telephone: '+222 48 98 41 27',
  },
  Casablanca: {
    fr: { ville: 'Casablanca', nom: 'Diallo Mohamed' },
    ar: { ville: 'الدار البيضاء', nom: 'ديالو محمد' },
    telephone: '+222 47 98 41 27',
  },
  Oujda: {
    fr: { ville: 'Oujda', nom: 'El Hassen Mohamed Ahmed' },
    ar: { ville: 'وجدة', nom: 'الحسن محمد أحمد' },
    telephone: '+222 43 82 17 88',
  },
  Khouribga: {
    fr: { ville: 'Khouribga', nom: 'Habib Haballa' },
    ar: { ville: 'خريبكة', nom: 'حبيب حب الله' },
    telephone: '+212 710 844 921',
  },
  Mohammédia: {
    fr: { ville: 'Mohammédia', nom: 'Cheikh Kebe' },
    ar: { ville: 'المحمدية', nom: 'الشيخ كيبي' },
    telephone: '+222 47 97 44 24',
  },
  Agadir: {
    fr: { ville: 'Agadir', nom: 'El ghassem Ahmedou El Hachimi' },
    ar: { ville: 'أكادير', nom: 'القاسم أحمدو الهاشمي ' },
    telephone: '+222 47 02 63 32',
  },
  'Béni Mellal': {
    fr: { ville: 'Béni Mellal', nom: 'Mohamed Essalek Mohamed Essalek' },
    ar: { ville: 'بني ملال', nom: '  محمد السالك محمد السالك' },
    telephone: '+212 605 331 595',
  },
  Ouarzazate: {
    fr: { ville: 'Ouarzazate', nom: 'Abdellahi Bellah' },
    ar: { ville: 'ورزازات', nom: 'عبد الله بلاه' },
    telephone: '+222 41 33 11 98',
  },
};

export const cities = {
  fr: Object.values(superviseursGeneraux).map((v) => v.fr.ville),
  ar: Object.values(superviseursGeneraux).map((v) => v.ar.ville),
};

export function getSuperviseurGeneral(ville: string) {
  return (
    Object.values(superviseursGeneraux).find(
      (sg) => sg.fr.ville === ville || sg.ar.ville === ville
    ) || null
  );
}

/**
 * Formate un numéro de téléphone mauritanien ou marocain.
 * +222XXXXXXXX  → +222 XX XX XX XX
 * +212XXXXXXXXX → +212 XXX XXX XXX
 * Déjà formaté (contient des espaces après l'indicatif) → retourné tel quel.
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\s+/g, '');
  let result = phone;

  if (cleaned.startsWith('+222')) {
    const digits = cleaned.slice(4);
    if (digits.length === 8) {
      result = `+222 ${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)}`;
    } else {
      const parts = digits.match(/.{1,2}/g) ?? [];
      result = `+222 ${parts.join(' ')}`;
    }
  } else if (cleaned.startsWith('+212')) {
    const digits = cleaned.slice(4);
    if (digits.length === 9) {
      result = `+212 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
    } else {
      const parts = digits.match(/.{1,3}/g) ?? [];
      result = `+212 ${parts.join(' ')}`;
    }
  }

  // Force LTR pour éviter l'inversion en contexte RTL (arabe)
  return `\u202A${result}\u202C`;
}
export const Wave = () => (
  <svg viewBox="0 0 720 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,12 Q180,46 360,20 Q540,0 720,28 L720,60 L0,60 Z" fill="#0d2a5e" />
    <path d="M0,24 Q180,56 360,32 Q540,10 720,40 L720,60 L0,60 Z" fill="#c8102e" opacity="0.85" />
    <path d="M0,36 Q180,64 360,44 Q540,22 720,52 L720,60 L0,60 Z" fill="#00843D" opacity="0.8" />
  </svg>
);

export default function CardContent({
  name,
  whatsapp,
  city,
  photo,
  lang,
  logoSrc,
}: {
  name: string;
  whatsapp: string;
  city: string;
  photo: string | null;
  lang?: Lang;
  logoSrc: string;
}) {
  const safeLang: Lang = lang === 'ar' ? 'ar' : 'fr';
  const t = translations[safeLang];
  const today = new Date();
  const fmt = (d: Date) =>
    d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const issued = fmt(today);
  const next = new Date(today);
  next.setFullYear(next.getFullYear() + 1);
  const expire = fmt(next);

  const sg = getSuperviseurGeneral(city);

  return (
    <div className="card-inner" dir={t.dir}>
      {/* ===== PANNEAU BLEU ===== */}
      <div className="left">
        <div className="photo-wrap">
          {photo ? (
            <img src={photo} className="member-photo" alt="Photo membre" />
          ) : (
            <div className="member-photo-placeholder">
              <svg viewBox="0 0 24 24" width="50" height="50" fill="rgba(255,255,255,0.4)">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
          )}
        </div>

        <div className="label">{t.labelName}</div>
        <div className="field">{name || '—'}</div>

        <div className="label">{t.whatsappLabel}</div>
        {/* dir="ltr" + unicodeBidi="embed" forcent la lecture gauche→droite
            même dans un conteneur RTL (arabe) */}
        <div
          className="field"
          dir="ltr"
          style={{ textAlign: safeLang === 'ar' ? 'right' : 'left' }}
        >
          {whatsapp ? formatPhoneNumber(whatsapp) : '—'}
        </div>

        <div className="label">{t.labelCity}</div>
        <div className="field">{city}</div>

        <div className="label">{t.labelContact}</div>
        {sg && (
          <div className="contact-row">
            <div className="contact-icon sg">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <span className="contact-text">
              {t.sgLabel}: {safeLang === 'fr' ? sg.fr.nom : sg.ar.nom}
            </span>
          </div>
        )}

        <div className="contact-row">
          <div className="contact-icon wa">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.742.951.996-3.624-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          </div>
          {/* Numéro du superviseur : toujours LTR */}
          <span
            className="contact-text"
            dir="ltr"
            style={{ unicodeBidi: 'embed' }}
          >
            {sg ? formatPhoneNumber(sg.telephone) : formatPhoneNumber('+222 36 42 71 79')}
          </span>
        </div>

        <div className="contact-row">
          <div className="contact-icon fb">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <span className="contact-text">AEM-MAROC</span>
        </div>
      </div>

      {/* ===== PANNEAU BLANC ===== */}
      <div className="right">
        <div className="badge">{t.cardBadge}</div>

        <div className="title-row">
          <img src={logoSrc} className="logo-right" alt="AEMM" />
          <h1>
            {t.cardTitle1}
            <br />
            {t.cardTitle2}
          </h1>
        </div>

        <div className="divider" />
        <div className="box">{t.cardDesc}</div>
        <div className="tag">{t.cardTag}</div>

        <ul className="perks">
          <li>
            <span className="perk-dot red" />
            {t.perk1}
          </li>
          <li>
            <span className="perk-dot green" />
            {t.perk2}
          </li>
          <li>
            <span className="perk-dot blue" />
            {t.perk3}
          </li>
        </ul>

        <div className="dates">
          {t.issued} : {issued}
          <br />
          {t.expires} : {expire}
        </div>
      </div>

      {/* ===== WAVE FOOTER ===== */}
      <div className="wave-footer">
        <Wave />
      </div>
    </div>
  );
}