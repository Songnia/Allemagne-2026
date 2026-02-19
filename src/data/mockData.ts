import type { RoadmapStep, Article, EligibilityQuestion, PricingTier, PaymentMethod } from '@/types';

export const mockRoadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    title: 'Avant de commencer',
    description: 'Comprendre les bases de l\'immigration allemande et évaluer votre profil',
    icon: 'flag',
    isLocked: false,
    requiredTier: 'free',
    articles: [],
    isCompleted: false,
  },
  {
    id: 2,
    title: 'Préparation du dossier',
    description: 'Reconnaitre vos diplômes, préparer les documents officiels',
    icon: 'folder',
    isLocked: true,
    requiredTier: 'simple',
    articles: [],
    isCompleted: false,
  },
  {
    id: 3,
    title: 'Recherche d\'emploi / Admission',
    description: 'Stratégies de recherche, CV allemand, lettres de motivation',
    icon: 'work',
    isLocked: true,
    requiredTier: 'simple',
    articles: [],
    isCompleted: false,
  },
  {
    id: 4,
    title: 'Demande de visa',
    description: 'Rendez-vous à l\'ambassade, compte bloqué, assurance santé',
    icon: 'description',
    isLocked: true,
    requiredTier: 'complete',
    articles: [],
    isCompleted: false,
  },
  {
    id: 5,
    title: 'Préparation au départ',
    description: 'Logement temporaire, transfert d\'argent, checklist finale',
    icon: 'flight',
    isLocked: true,
    requiredTier: 'complete',
    articles: [],
    isCompleted: false,
  },
  {
    id: 6,
    title: 'Installation en Allemagne',
    description: 'Anmeldung, ouverture de compte, assurances, réseau',
    icon: 'home',
    isLocked: true,
    requiredTier: 'complete',
    articles: [],
    isCompleted: false,
  },
];

export const mockArticles: Article[] = [
  // Step 1: Avant de commencer (Free)
  {
    id: 'article-1-1',
    title: 'Pourquoi l\'Allemagne en 2026 ?',
    excerpt: 'Découvrez pourquoi l\'Allemagne est devenue la destination privilégiée des talents africains.',
    content: `
      <h2>L'Allemagne ouvre ses portes</h2>
      <p>En 2024, l'Allemagne a réformé sa loi sur l'immigration avec la <strong>Chancenkarte</strong> (carte des chances), facilitant l'accès au marché du travail pour les professionnels qualifiés.</p>
      
      <h3>Les chiffres clés</h3>
      <ul>
        <li>172,422 visas délivrés en 2024</li>
        <li>400,000 travailleurs qualifiés recherchés par an</li>
        <li>18 mois de permis de recherche d'emploi avec la Chancenkarte</li>
      </ul>
      
      <h3>Avantages par rapport au Canada</h3>
      <table>
        <tr>
          <th>Critère</th>
          <th>Allemagne</th>
          <th>Canada</th>
        </tr>
        <tr>
          <td>Coût initial</td>
          <td>€11,904 (compte bloqué)</td>
          <td>$30,000+ (preuves financières)</td>
        </tr>
        <tr>
          <td>Délai de traitement</td>
          <td>4-12 semaines</td>
          <td>14-24 mois</td>
        </tr>
        <tr>
          <td>Niveau de langue</td>
          <td>A1-B1 (selon profil)</td>
          <td>CLB 7-9 (anglais avancé)</td>
        </tr>
      </table>
    `,
    category: 'introduction',
    tags: ['chancenkarte', 'visa', 'comparaison'],
    readTime: 5,
    isRead: false,
    stepId: 1,
    requiredTier: 'free',
    icon: 'info',
  },
  {
    id: 'article-1-2',
    title: 'Comprendre la Chancenkarte',
    excerpt: 'Tout savoir sur le système de points et les critères d\'éligibilité.',
    content: `
      <h2>La Chancenkarte : Comment ça marche ?</h2>
      <p>La Chancenkarte fonctionne sur un système de points. Vous devez obtenir <strong>au moins 6 points sur 8 critères</strong> pour être éligible.</p>
      
      <h3>Les 8 critères de notation</h3>
      <ol>
        <li><strong>Qualifications</strong> (1-4 points) : Bac+3, Bac+5, doctorat</li>
        <li><strong>Expérience professionnelle</strong> (1-3 points) : 2, 3, ou 5+ ans</li>
        <li><strong>Compétences linguistiques</strong> (1-3 points) : A1, B1, ou B2 allemand</li>
        <li><strong>Âge</strong> (1-2 points) : Moins de 35 ou 40 ans</li>
        <li><strong>Adaptabilité</strong> (1 point) : Séjour antérieur en Allemagne</li>
        <li><strong>Partenaire/époux</strong> (1 point) : Compétences du conjoint</li>
        <li><strong>Formation professionnelle</strong> (1-2 points) : Reconnue en Allemagne</li>
        <li><strong>Revenus futurs</strong> (1 point) : Offre d'emploi signée</li>
      </ol>
      
      <h3>Exigences de base</h3>
      <ul>
        <li>Diplôme professionnel de 2 ans minimum OU qualification universitaire</li>
        <li>Preuves financières : €11,904 sur compte bloqué OU contrat de travail</li>
        <li>Assurance santé allemande</li>
      </ul>
    `,
    category: 'chancenkarte',
    tags: ['chancenkarte', 'points', 'eligibilite'],
    readTime: 8,
    isRead: false,
    stepId: 1,
    requiredTier: 'free',
    icon: 'stars',
  },
  {
    id: 'article-1-3',
    title: 'Rejoindre la communauté Telegram',
    excerpt: 'Connectez-vous avec d\'autres candidats et des immigrants installés.',
    content: `
      <h2>La communauté ALLEMAGNE2026</h2>
      <p>Rejoignez notre groupe Telegram exclusif pour échanger avec d'autres candidats et obtenir des conseils de ceux qui ont réussi leur installation.</p>
      
      <h3>Ce que vous trouverez dans le groupe</h3>
      <ul>
        <li>Partage d'expériences et de conseils pratiques</li>
        <li>Alertes sur les nouvelles opportunités</li>
        <li>Entraide pour la préparation des documents</li>
        <li>Rencontres virtuelles avec des immigrants installés</li>
        <li>Soutien moral tout au long du parcours</li>
      </ul>
      
      <h3>Règles de la communauté</h3>
      <ol>
        <li>Respect et bienveillance obligatoires</li>
        <li>Pas de publicité ni de spam</li>
        <li>Vérifier les informations avant de les partager</li>
        <li>Aider les nouveaux membres</li>
      </ol>
      
      <p><strong>Note :</strong> L'accès au groupe Telegram est réservé aux membres Complete (10,000 FCFA).</p>
    `,
    category: 'communaute',
    tags: ['telegram', 'communaute', 'entraide'],
    readTime: 3,
    isRead: false,
    stepId: 1,
    requiredTier: 'complete',
    icon: 'group',
  },

  // Step 2: Préparation du dossier (Simple)
  {
    id: 'article-2-1',
    title: 'Reconnaissance des diplômes',
    excerpt: 'Guide étape par étape pour faire reconnaître vos qualifications.',
    content: `
      <h2>La reconnaissance des diplômes en Allemagne</h2>
      <p>Pour travailler en Allemagne, vos diplômes doivent être reconnus comme équivalents aux qualifications allemandes.</p>
      
      <h3>Quand est-ce obligatoire ?</h3>
      <ul>
        <li>Métiers réglementés (médecine, ingénierie, enseignement...)</li>
        <li>Demande de Chancenkarte avec points pour qualifications</li>
      </ul>
      
      <h3>Processus de reconnaissance</h3>
      <ol>
        <li><strong>Identifier l'autorité compétente</strong> : Sur <a href="https://www.anerkennung-in-deutschland.de">anerkennung-in-deutschland.de</a></li>
        <li><strong>Rassembler les documents</strong> : Diplômes, relevés de notes, programmes</li>
        <li><strong>Traduction assermentée</strong> : Par un traducteur certifié</li>
        <li><strong>Soumettre la demande</strong> : En ligne ou par courrier</li>
        <li><strong>Attendre la décision</strong> : 2-4 mois en moyenne</li>
      </ol>
      
      <h3>Coûts</h3>
      <ul>
        <li>Frais de reconnaissance : €100-600 selon le diplôme</li>
        <li>Traduction : €30-50 par page</li>
        <li>Apostille/Légalisation : €10-50 par document</li>
      </ul>
    `,
    category: 'documents',
    tags: ['diplomes', 'reconnaissance', 'traduction'],
    readTime: 10,
    isRead: false,
    stepId: 2,
    requiredTier: 'simple',
    icon: 'school',
  },
  {
    id: 'article-2-2',
    title: 'L\'apostille et la légalisation',
    excerpt: 'Comment authentifier vos documents pour les autorités allemandes.',
    content: `
      <h2>Authentification des documents</h2>
      <p>Les documents africains doivent être authentifiés pour être valables en Allemagne.</p>
      
      <h3>Apostille (Convention de La Haye)</h3>
      <p>Pays concernés : Afrique du Sud, Cap-Vert, Lesotho, Liberia, Maroc, Namibie, Sénégal, Togo, Tunisie...</p>
      <p>Processus : Ministère des Affaires étrangères ou tribunal compétent du pays d'origine.</p>
      
      <h3>Légalisation (autres pays)</h3>
      <p>Pays concernés : Côte d'Ivoire, Cameroun, RDC, Gabon, Mali, Burkina Faso...</p>
      <ol>
        <li>Légalisation par le ministère des Affaires étrangères du pays</li>
        <li>Validation par l'ambassade d'Allemagne</li>
      </ol>
      
      <h3>Documents concernés</h3>
      <ul>
        <li>Acte de naissance</li>
        <li>Casier judiciaire</li>
        <li>Diplômes et relevés de notes</li>
        <li>Acte de mariage (si applicable)</li>
      </ul>
    `,
    category: 'documents',
    tags: ['apostille', 'legalisation', 'documents'],
    readTime: 7,
    isRead: false,
    stepId: 2,
    requiredTier: 'simple',
    icon: 'verified',
  },

  // Step 3: Recherche d'emploi (Simple)
  {
    id: 'article-3-1',
    title: 'Le CV allemand (Lebenslauf)',
    excerpt: 'Modèles et conseils pour créer un CV qui plaît aux recruteurs allemands.',
    content: `
      <h2>Le CV allemand : Règles d'or</h2>
      <p>Le CV allemand suit des conventions strictes. Respectez-les pour maximiser vos chances.</p>
      
      <h3>Format standard</h3>
      <ul>
        <li><strong>Photo professionnelle</strong> : Oui, en haut à droite</li>
        <li><strong>Date de naissance et nationalité</strong> : Obligatoires</li>
        <li><strong>Ordre antichronologique</strong> : Du plus récent au plus ancien</li>
        <li><strong>2 pages maximum</strong> : Précision et concision</li>
        <li><strong>Signature manuscrite</strong> : En bas du CV</li>
      </ul>
      
      <h3>Sections obligatoires</h3>
      <ol>
        <li>Données personnelles (Persönliche Daten)</li>
        <li>Formation académique (Akademische Ausbildung)</li>
        <li>Expérience professionnelle (Berufserfahrung)</li>
        <li>Compétences linguistiques (Sprachkenntnisse)</li>
        <li>Compétences informatiques (EDV-Kenntnisse)</li>
        <li>Centres d'intérêt (Hobbys/Interessen)</li>
      </ol>
      
      <h3>Conseils pratiques</h3>
      <ul>
        <li>Utilisez un modèle européen (Europass) adapté</li>
        <li>Mentionnez votre niveau d'allemand (CEFR)</li>
        <li>Traduction assermentée si le CV est en français</li>
        <li>Vérifiez l'orthographe allemande</li>
      </ul>
    `,
    category: 'emploi',
    tags: ['cv', 'lebenslauf', 'recherche-emploi'],
    readTime: 8,
    isRead: false,
    stepId: 3,
    requiredTier: 'simple',
    icon: 'description',
  },
  {
    id: 'article-3-2',
    title: 'Plateformes de recherche d\'emploi',
    excerpt: 'Les meilleurs sites pour trouver un emploi en Allemagne.',
    content: `
      <h2>Où chercher un emploi en Allemagne ?</h2>
      
      <h3>Plateformes généralistes</h3>
      <ul>
        <li><strong>LinkedIn</strong> : Incontournable pour les profils qualifiés</li>
        <li><strong>Indeed.de</strong> : Le plus grand agrégateur d'offres</li>
        <li><strong>StepStone.de</strong> : Spécialisé cadres et experts</li>
        <li><strong>Xing</strong> : Le "LinkedIn allemand" - très important !</li>
      </ul>
      
      <h3>Plateformes spécialisées</h3>
      <ul>
        <li><strong>Make it in Germany</strong> : Portail officiel pour immigrants qualifiés</li>
        <li><strong>Arbeitsagentur.de</strong> : Agence fédérale pour l'emploi</li>
        <li><strong>Stack Overflow Jobs</strong> : Pour les développeurs</li>
        <li><strong>AngelList</strong> : Startups allemandes</li>
      </ul>
      
      <h3>Secteurs en pénurie (2026)</h3>
      <ul>
        <li>IT et développement logiciel</li>
        <li>Santé et soins infirmiers</li>
        <li>Ingénierie (mécanique, électrique)</li>
        <li>Logistique et transport</li>
        <li>Hôtellerie et restauration</li>
      </ul>
      
      <h3>Conseils de recherche</h3>
      <ol>
        <li>Créez un profil Xing détaillé</li>
        <li>Postulez même si vous ne remplissez pas 100% des critères</li>
        <li>Utilisez les mots-clés en allemand</li>
        <li>Suivez les entreprises qui vous intéressent</li>
      </ol>
    `,
    category: 'emploi',
    tags: ['emploi', 'recherche', 'plateformes'],
    readTime: 6,
    isRead: false,
    stepId: 3,
    requiredTier: 'simple',
    icon: 'search',
  },

  // Step 4: Demande de visa (Complete)
  {
    id: 'article-4-1',
    title: 'Le compte bloqué (Sperrkonto)',
    excerpt: 'Guide complet pour ouvrir et gérer votre compte bloqué.',
    content: `
      <h2>Le compte bloqué (Sperrkonto)</h2>
      <p>Le compte bloqué est une preuve financière obligatoire pour la plupart des visas allemands.</p>
      
      <h3>Montant requis (2026)</h3>
      <p><strong>€11,904 par an</strong> (soit €992 par mois)</p>
      
      <h3>Banques proposant le Sperrkonto</h3>
      <ul>
        <li><strong>Expatrio</strong> : 100% en ligne, service en anglais</li>
        <li><strong>Fintiba</strong> : Partenaire officiel, rapide</li>
        <li><strong>Coracle</strong> : Moins cher, bon service client</li>
        <li><strong>Deutsche Bank</strong> : En présentiel, plus long</li>
      </ul>
      
      <h3>Processus d'ouverture</h3>
      <ol>
        <li>Créez un compte en ligne sur la plateforme choisie</li>
        <li>Téléchargez vos documents (passeport, admission)</li>
        <li>Effectuez le virement international (€11,904 + frais)</li>
        <li>Recevez la confirmation pour l'ambassade</li>
        <li>En Allemagne, ouvrez un compte courant</li>
        <li>Le Sperrkonto verse €992/mois sur votre compte</li>
      </ol>
      
      <h3>Frais</h3>
      <ul>
        <li>Expatrio : €49 (setup) + €5/mois</li>
        <li>Fintiba : €89 (setup) + €4.90/mois</li>
        <li>Coracle : €59 (setup) + €0/mois</li>
      </ul>
      
      <h3>Astuce</h3>
      <p>Si vous avez un contrat de travail, le compte bloqué n'est pas nécessaire !</p>
    `,
    category: 'visa',
    tags: ['compte-bloque', 'sperrkonto', 'finances'],
    readTime: 10,
    isRead: false,
    stepId: 4,
    requiredTier: 'complete',
    icon: 'account_balance',
  },
  {
    id: 'article-4-2',
    title: 'Rendez-vous à l\'ambassade',
    excerpt: 'Comment prendre rendez-vous et préparer votre entretien.',
    content: `
      <h2>Le rendez-vous visa</h2>
      <p>La prise de rendez-vous à l'ambassade d'Allemagne est souvent le goulot d'étranglement du processus.</p>
      
      <h3>Comment prendre rendez-vous</h3>
      <ol>
        <li>Visitez le site de l'ambassade d'Allemagne dans votre pays</li>
        <li>Créez un compte sur le système de rendez-vous</li>
        <li>Sélectionnez "Visa de travail / Chancenkarte"</li>
        <li>Choisissez une date disponible (souvent dans 2-8 semaines)</li>
        <li>Confirmez et imprimez le reçu</li>
      </ol>
      
      <h3>Documents à apporter</h3>
      <ul>
        <li>Passeport valide (10 ans, 2 pages vierges)</li>
        <li>2 photos d'identité biométriques</li>
        <li>Formulaire de demande rempli et signé</li>
        <li>Contrat de travail OU preuves financières (Sperrkonto)</li>
        <li>Assurance santé voyage</li>
        <li>Lettre de motivation</li>
        <li>CV détaillé</li>
        <li>Diplômes (originaux + copies)</li>
        <li>Reconnaissance des diplômes (si applicable)</li>
        <li>Justificatif de logement temporaire</li>
        <li>Preuve de paiement des frais de visa (€75)</li>
      </ul>
      
      <h3>L'entretien</h3>
      <ul>
        <li>Durée : 10-20 minutes</li>
        <li>Langue : Allemand (idéalement) ou Anglais</li>
        <li>Questions typiques : Parcours, motivations, projet professionnel</li>
        <li>Soyez précis et concis</li>
      </ul>
      
      <h3>Délai de traitement</h3>
      <p>4 à 12 semaines après l'entretien. La Chancenkarte peut prendre plus de temps.</p>
    `,
    category: 'visa',
    tags: ['ambassade', 'rendez-vous', 'entretien'],
    readTime: 8,
    isRead: false,
    stepId: 4,
    requiredTier: 'complete',
    icon: 'event',
  },

  // Step 5: Préparation au départ (Complete)
  {
    id: 'article-5-1',
    title: 'Checklist avant le départ',
    excerpt: 'Tout ce qu\'il faut préparer dans les dernières semaines.',
    content: `
      <h2>Checklist de départ</h2>
      
      <h3>4 semaines avant</h3>
      <ul>
        <li>✓ Réserver un logement temporaire (1er mois)</li>
        <li>✓ Ouvrir le compte bloqué</li>
        <li>✓ Souscrire une assurance santé voyage</li>
        <li>✓ Faire traduire les documents restants</li>
      </ul>
      
      <h3>2 semaines avant</h3>
      <ul>
        <li>✓ Résilier/abonner les services locaux</li>
        <li>✓ Prévenir sa banque du départ</li>
        <li>✓ Faire un bilan médical complet</li>
        <li>✓ Commander des euros (cash pour les premiers jours)</li>
      </ul>
      
      <h3>1 semaine avant</h3>
      <ul>
        <li>✓ Faire les bagages (limite 2x23kg en soute)</li>
        <li>✓ Scanner tous les documents importants</li>
        <li>✓ Télécharger les apps utiles (DB, Google Maps offline)</li>
        <li>✓ Vérifier la validité du passeport (6 mois minimum)</li>
      </ul>
      
      <h3>Documents à garder sur soi</h3>
      <ul>
        <li>Passeport + copies</li>
        <li>Visa/approbation</li>
        <li>Attestation d'assurance</li>
        <li>Confirmation de logement temporaire</li>
        <li>Preuve du compte bloqué</li>
        <li>Diplômes originaux</li>
        <li>Contacts d'urgence</li>
      </ul>
      
      <h3>Apps indispensables</h3>
      <ul>
        <li><strong>DB Navigator</strong> : Trains allemands</li>
        <li><strong>Google Maps</strong> : Navigation</li>
        <li><strong>DeepL</strong> : Traduction</li>
        <li><strong>WG-Gesucht</strong> : Recherche de colocation</li>
        <li><strong>StepStone/LinkedIn</strong> : Emploi</li>
      </ul>
    `,
    category: 'depart',
    tags: ['checklist', 'preparation', 'depart'],
    readTime: 6,
    isRead: false,
    stepId: 5,
    requiredTier: 'complete',
    icon: 'checklist',
  },

  // Step 6: Installation en Allemagne (Complete)
  {
    id: 'article-6-1',
    title: 'L\'Anmeldung (inscription résidentielle)',
    excerpt: 'La première démarche obligatoire à votre arrivée.',
    content: `
      <h2>L'Anmeldung : Guide complet</h2>
      <p>L'Anmeldung (inscription à l'adresse) est OBLIGATOIRE dans les 14 jours suivant votre emménagement.</p>
      
      <h3>Pourquoi c'est important</h3>
      <ul>
        <li>Obligation légale (amende possible)</li>
        <li>Nécessaire pour ouvrir un compte bancaire</li>
        <li>Nécessaire pour le contrat de travail</li>
        <li>Permet de recevoir votre numéro de TVA (Steuer-ID)</li>
      </ul>
      
      <h3>Comment faire l'Anmeldung</h3>
      <ol>
        <li><strong>Prendre rendez-vous</strong> : Sur le site du Bürgeramt de votre ville</li>
        <li><strong>Documents nécessaires</strong> :
          <ul>
            <li>Passeport</li>
            <li>Formulaire d'inscription (rempli)</li>
            <li>Attestation du propriétaire (Wohnungsgeberbestätigung)</li>
            <li>Visa (si applicable)</li>
          </ul>
        </li>
        <li><strong>Se présenter au rendez-vous</strong> : Ponctualité obligatoire !</li>
        <li><strong>Recevoir la confirmation</strong> : Meldebescheinigung</li>
      </ol>
      
      <h3>Astuces</h3>
      <ul>
        <li>Les rendez-vous sont souvent compleits : réservez en ligne dès que possible</li>
        <li>Certains Bürgeramt acceptent les walk-ins le matin</li>
        <li>Service gratuit</li>
        <li>La Steuer-ID arrive par courrier 2-4 semaines après</li>
      </ul>
    `,
    category: 'installation',
    tags: ['anmeldung', 'inscription', 'administratif'],
    readTime: 7,
    isRead: false,
    stepId: 6,
    requiredTier: 'complete',
    icon: 'location_city',
  },
  {
    id: 'article-6-2',
    title: 'Ouvrir un compte bancaire',
    excerpt: 'Comparer les banques et choisir celle qui vous convient.',
    content: `
      <h2>Compte bancaire en Allemagne</h2>
      <p>Un compte allemand (Girokonto) est indispensable pour votre vie quotidienne.</p>
      
      <h3>Banques recommandées pour les étrangers</h3>
      <ul>
        <li><strong>N26</strong> : 100% mobile, en anglais, gratuite</li>
        <li><strong>Deutsche Bank</strong> : Réseau physique, plus cher</li>
        <li><strong>Commerzbank</strong> : Gratuit avec revenus réguliers</li>
        <li><strong>DKB</strong> : Gratuite, bon service</li>
        <li><strong>ING</strong> : En ligne, bonne réputation</li>
      </ul>
      
      <h3>Documents nécessaires</h3>
      <ul>
        <li>Passeport</li>
        <li>Meldebescheinigung (Anmeldung)</li>
        <li>Contrat de travail ou preuves de revenus</li>
        <li>Numéro de TVA allemand (Steuer-ID) - parfois optionnel</li>
      </ul>
      
      <h3>Processus</h3>
      <ol>
        <li>Choisir la banque et le type de compte</li>
        <li>Remplir le formulaire en ligne ou en agence</li>
        <li>Vérification d'identité (VideoIdent ou PostIdent)</li>
        <li>Recevoir la carte et le PIN par courrier</li>
        <li>Activer le compte en ligne</li>
      </ol>
      
      <h3>Services importants</h3>
      <ul>
        <li><strong>EC-Karte</strong> : Carte de débit allemande</li>
        <li><strong>Online-Banking</strong> : Virements SEPA gratuits</li>
        <li><strong>Lastschrift</strong> : Prélèvement automatique</li>
        <li><strong>Überweisung</strong> : Virement classique</li>
      </ul>
    `,
    category: 'installation',
    tags: ['banque', 'compte', 'finances'],
    readTime: 8,
    isRead: false,
    stepId: 6,
    requiredTier: 'complete',
    icon: 'account_balance_wallet',
  },
];

// Eligibility Questions
export const eligibilityQuestions: EligibilityQuestion[] = [
  {
    id: 1,
    question: 'Quel est votre niveau d\'études le plus élevé ?',
    options: [
      { id: 'q1-a', label: 'Bac+5 ou plus (Master, Doctorat)', points: 4 },
      { id: 'q1-b', label: 'Bac+3 (Licence)', points: 3 },
      { id: 'q1-c', label: 'Bac+2 (BTS, DUT)', points: 2 },
      { id: 'q1-d', label: 'Bac ou formation professionnelle 2 ans', points: 1 },
      { id: 'q1-e', label: 'Autre', points: 0 },
    ],
  },
  {
    id: 2,
    question: 'Quelle est votre expérience professionnelle ?',
    options: [
      { id: 'q2-a', label: '5 ans ou plus', points: 3 },
      { id: 'q2-b', label: '3 à 5 ans', points: 2 },
      { id: 'q2-c', label: '2 ans', points: 1 },
      { id: 'q2-d', label: 'Moins de 2 ans', points: 0 },
    ],
  },
  {
    id: 3,
    question: 'Quel est votre niveau d\'allemand ?',
    options: [
      { id: 'q3-a', label: 'B2 ou plus', points: 3 },
      { id: 'q3-b', label: 'B1', points: 2 },
      { id: 'q3-c', label: 'A1-A2', points: 1 },
      { id: 'q3-d', label: 'Aucun / Je commence', points: 0 },
    ],
  },
];

// Pricing Tiers
export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Gratuit',
    price: 0,
    currency: 'FCFA',
    period: 'à vie',
    description: 'Pour découvrir les opportunités',
    features: [
      'Accès aux articles publics',
      'Aperçu de la roadmap',
      'Test d\'éligibilité basique',
    ],
    buttonText: 'Commencer gratuitement',
    recommended: false,
  },
  {
    id: 'simple',
    name: 'Simple',
    price: 2000,
    currency: 'FCFA',
    period: 'une fois',
    description: 'L\'essentiel pour démarrer',
    features: [
      'Accès complet à la roadmap',
      'Guide des démarches administratives',
      'Liste des documents requis',
      'Support par email',
    ],
    buttonText: 'Choisir cette offre',
    recommended: false,
    checkoutUrl: 'https://avkshop.mychariow.shop/allemagne2026-acess-2000f/checkout',
  },
  {
    id: 'complete',
    name: 'Complète',
    price: 10000,
    currency: 'FCFA',
    period: 'une fois',
    description: 'La solution tout-en-un pour réussir',
    features: [
      'Tout ce qu\'il y a dans l\'offre Simple',
      'Modèles de CV et lettres de motivation',
      'Calculateur de points avancé',
      'Accès au groupe privé Telegram',
      'Session de Q&A mensuelle',
    ],
    buttonText: 'Choisir cette offre',
    recommended: true,
    checkoutUrl: 'https://avkshop.mychariow.shop/allemagne2026-acess-10000f/checkout',
  },
];

// Payment Methods
export const paymentMethods: PaymentMethod[] = [
  {
    id: 'wave',
    name: 'Wave',
    icon: 'wave',
    color: '#1BA7F2',
  },
  {
    id: 'orange_money',
    name: 'Orange Money',
    icon: 'orange_money',
    color: '#FF6600',
  },
];

// Telegram Group Info
export const telegramGroup = {
  name: 'ALLEMAGNE2026 Community',
  inviteLink: 'https://t.me/+Allemagne2026Community',
  memberCount: 247,
  description: 'Communauté d\'entraide pour les candidats à l\'immigration allemande',
};
