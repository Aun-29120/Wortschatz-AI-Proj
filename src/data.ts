import { Word } from './types';

export const WORDS: Word[] = [
  // --- BEGINNER (70 words) ---
  {
    id: 'ich',
    word: 'ich',
    translation: 'I',
    difficulty: 'Beginner',
    gender: '',
    example: 'Ich lerne Deutsch.',
    exampleTranslation: 'I am learning German.',
    pronunciation: "ikh - Soft 'ch' sound made at the back of the mouth."
  },
  {
    id: 'du',
    word: 'du',
    translation: 'you (singular, informal)',
    difficulty: 'Beginner',
    gender: '',
    example: 'Lernst du Deutsch?',
    exampleTranslation: 'Are you learning German?',
    pronunciation: 'doo - Sounds like the English \"do\".'
  },
  {
    id: 'er',
    word: 'er',
    translation: 'he',
    difficulty: 'Beginner',
    gender: '',
    example: 'Er wohnt in Berlin.',
    exampleTranslation: 'He lives in Berlin.',
    pronunciation: 'ehr - Soft r, almost like \"air\".'
  },
  {
    id: 'sie',
    word: 'sie',
    translation: 'she / they',
    difficulty: 'Beginner',
    gender: '',
    example: 'Sie tanzt gerne.',
    exampleTranslation: 'She likes to dance.',
    pronunciation: 'zee - Sounds like \"see\".'
  },
  {
    id: 'es',
    word: 'es',
    translation: 'it',
    difficulty: 'Beginner',
    gender: '',
    example: 'Es ist kalt heute.',
    exampleTranslation: 'It is cold today.',
    pronunciation: 'ess - Rhymes with \"less\".'
  },
  {
    id: 'wir',
    word: 'wir',
    translation: 'we',
    difficulty: 'Beginner',
    gender: '',
    example: 'Wir reisen zusammen.',
    exampleTranslation: 'We are traveling together.',
    pronunciation: 'veer - Sounds like the English \"fear\" but with a W/V sound.'
  },
  {
    id: 'ihr',
    word: 'ihr',
    translation: 'you (plural, informal)',
    difficulty: 'Beginner',
    gender: '',
    example: 'Habt ihr Zeit?',
    exampleTranslation: 'Do you have time?',
    pronunciation: 'eer - Sounds like \"ear\".'
  },
  {
    id: 'sein',
    word: 'sein',
    translation: 'to be',
    difficulty: 'Beginner',
    gender: '',
    example: 'Das muss schwierig sein.',
    exampleTranslation: 'That must be difficult.',
    pronunciation: 'zighn - Sounds like the English \"sign\".'
  },
  {
    id: 'haben',
    word: 'haben',
    translation: 'to have',
    difficulty: 'Beginner',
    gender: '',
    example: 'Wir haben einen Hund.',
    exampleTranslation: 'We have a dog.',
    pronunciation: 'HAH-ben - Open \"ah\" sound, followed by \"ben\".'
  },
  {
    id: 'werden',
    word: 'werden',
    translation: 'to become / will',
    difficulty: 'Beginner',
    gender: '',
    example: 'Ich werde müde.',
    exampleTranslation: 'I am getting tired.',
    pronunciation: 'VAIR-den - \"V\" sound, rhymes with \"fair\" + \"den\".'
  },
  {
    id: 'koennen',
    word: 'können',
    translation: 'can / to be able to',
    difficulty: 'Beginner',
    gender: '',
    example: 'Kannst du mir helfen?',
    exampleTranslation: 'Can you help me?',
    pronunciation: 'KURN-en - Rounded vowel, like French \"eu\" in fleur.'
  },
  {
    id: 'muessen',
    word: 'müssen',
    translation: 'must / to have to',
    difficulty: 'Beginner',
    gender: '',
    example: 'Ich muss jetzt schlafen.',
    exampleTranslation: 'I must sleep now.',
    pronunciation: 'MEW-sen - Rounded u-umlaut, say \"ee\" with lips rounded.'
  },
  {
    id: 'wollen',
    word: 'wollen',
    translation: 'to want',
    difficulty: 'Beginner',
    gender: '',
    example: 'Was willst du essen?',
    exampleTranslation: 'What do you want to eat?',
    pronunciation: 'VOL-len - \"v\" sound, short \"o\" like in \"lost\".'
  },
  {
    id: 'gehen',
    word: 'gehen',
    translation: 'to go',
    difficulty: 'Beginner',
    gender: '',
    example: 'Wir gehen ins Kino.',
    exampleTranslation: 'We are going to the cinema.',
    pronunciation: 'GAY-en - Long close \"ay\", soft \"h\".'
  },
  {
    id: 'kommen',
    word: 'kommen',
    translation: 'to come',
    difficulty: 'Beginner',
    gender: '',
    example: 'Woher kommst du?',
    exampleTranslation: 'Where do you come from?',
    pronunciation: 'KOM-men - Short \"o\" sound, double \"m\".'
  },
  {
    id: 'sehen',
    word: 'sehen',
    translation: 'to see',
    difficulty: 'Beginner',
    gender: '',
    example: 'Ich sehe ein Haus.',
    exampleTranslation: 'I see a house.',
    pronunciation: 'ZAY-en - Pronounced like \"say\" but with a soft Z.'
  },
  {
    id: 'machen',
    word: 'machen',
    translation: 'to do / make',
    difficulty: 'Beginner',
    gender: '',
    example: 'Was machst du da?',
    exampleTranslation: 'What are you doing there?',
    pronunciation: "MAKH-en - German 'ch' like loch ness."
  },
  {
    id: 'geben',
    word: 'geben',
    translation: 'to give',
    difficulty: 'Beginner',
    gender: '',
    example: 'Gib mir bitte das Brot.',
    exampleTranslation: 'Please give me the bread.',
    pronunciation: 'GAY-ben - Hard G, long close E.'
  },
  {
    id: 'nehmen',
    word: 'nehmen',
    translation: 'to take',
    difficulty: 'Beginner',
    gender: '',
    example: 'Wir nehmen das Taxi.',
    exampleTranslation: 'We are taking the taxi.',
    pronunciation: 'NAY-men - Long A sound, silent H.'
  },
  {
    id: 'sagen',
    word: 'sagen',
    translation: 'to say / tell',
    difficulty: 'Beginner',
    gender: '',
    example: 'Sag mir die Wahrheit.',
    exampleTranslation: 'Tell me the truth.',
    pronunciation: 'ZAH-gen - Soft Z, followed by \"ah\" + \"gen\".'
  },
  {
    id: 'ja',
    word: 'ja',
    translation: 'yes',
    difficulty: 'Beginner',
    gender: '',
    example: 'Ja, ich spreche Deutsch.',
    exampleTranslation: 'Yes, I speak German.',
    pronunciation: 'yah - Sounds like \"yah\".'
  },
  {
    id: 'nein',
    word: 'nein',
    translation: 'no',
    difficulty: 'Beginner',
    gender: '',
    example: 'Nein, das reicht nicht.',
    exampleTranslation: 'No, that is not enough.',
    pronunciation: 'nine - Sounds exactly like the English \"nine\".'
  },
  {
    id: 'bitte',
    word: 'bitte',
    translation: 'please / you are welcome',
    difficulty: 'Beginner',
    gender: '',
    example: 'Ein Wasser, bitte.',
    exampleTranslation: 'A water, please.',
    pronunciation: 'BIT-teh - Short i, soft ending.'
  },
  {
    id: 'danke',
    word: 'danke',
    translation: 'thanks / thank you',
    difficulty: 'Beginner',
    gender: '',
    example: 'Vielen Dank für das Geschenk!',
    exampleTranslation: 'Thank you very much for the gift!',
    pronunciation: 'DAHN-keh - \"Dahn\" + short \"keh\".'
  },
  {
    id: 'gut',
    word: 'gut',
    translation: 'good',
    difficulty: 'Beginner',
    gender: '',
    example: 'Mir geht es gut.',
    exampleTranslation: 'I am doing good.',
    pronunciation: 'goot - Sounds like English \"goot\".'
  },
  {
    id: 'schlecht',
    word: 'schlecht',
    translation: 'bad',
    difficulty: 'Beginner',
    gender: '',
    example: 'Das Wetter ist heute schlecht.',
    exampleTranslation: 'The weather is bad today.',
    pronunciation: 'shlekht - Sh + lek + soft ch.'
  },
  {
    id: 'gross',
    word: 'groß',
    translation: 'big / large',
    difficulty: 'Beginner',
    gender: '',
    example: 'Das Haus ist sehr groß.',
    exampleTranslation: 'The house is very big.',
    pronunciation: 'grohs - Long close O + S-sound.'
  },
  {
    id: 'klein',
    word: 'klein',
    translation: 'small / little',
    difficulty: 'Beginner',
    gender: '',
    example: 'Das Kind ist noch klein.',
    exampleTranslation: 'The child is still small.',
    pronunciation: 'klighn - Sounds like English \"cline\".'
  },
  {
    id: 'neu',
    word: 'neu',
    translation: 'new',
    difficulty: 'Beginner',
    gender: '',
    example: 'Ich habe ein neues Auto.',
    exampleTranslation: 'I have a new car.',
    pronunciation: 'noy - Sounds like English \"boy\" with an N.'
  },
  {
    id: 'alt',
    word: 'alt',
    translation: 'old',
    difficulty: 'Beginner',
    gender: '',
    example: 'Die Stadt ist sehr alt.',
    exampleTranslation: 'The city is very old.',
    pronunciation: 'ahlt - Short A, rolling L, crisp T.'
  },
  {
    id: 'schnell',
    word: 'schnell',
    translation: 'fast / quick',
    difficulty: 'Beginner',
    gender: '',
    example: 'Er läuft sehr schnell.',
    exampleTranslation: 'He runs very fast.',
    pronunciation: 'shnell - Sh + nell.'
  },
  {
    id: 'langsam',
    word: 'langsam',
    translation: 'slow',
    difficulty: 'Beginner',
    gender: '',
    example: 'Bitte fahre langsam.',
    exampleTranslation: 'Please drive slowly.',
    pronunciation: 'LAHNG-zahm - Long A, soft Z.'
  },
  {
    id: 'viel',
    word: 'viel',
    translation: 'much / a lot',
    difficulty: 'Beginner',
    gender: '',
    example: 'Vielen Dank für Ihre Hilfe.',
    exampleTranslation: 'Thank you very much for your help.',
    pronunciation: 'feel - Sounds exactly like English \"feel\".'
  },
  {
    id: 'wenig',
    word: 'wenig',
    translation: 'little / few',
    difficulty: 'Beginner',
    gender: '',
    example: 'Ich habe wenig Geld.',
    exampleTranslation: 'I have little money.',
    pronunciation: "VAY-nikh - V-sound, long E, soft 'ch' sound at the end."
  },
  {
    id: 'heute',
    word: 'heute',
    translation: 'today',
    difficulty: 'Beginner',
    gender: '',
    example: 'Heute ist ein schöner Tag.',
    exampleTranslation: 'Today is a beautiful day.',
    pronunciation: 'HOY-teh - \"Hoy\" + short \"teh\".'
  },
  {
    id: 'morgen',
    word: 'morgen',
    translation: 'tomorrow / morning',
    difficulty: 'Beginner',
    gender: '',
    example: 'Wir sehen uns morgen.',
    exampleTranslation: 'We will see each other tomorrow.',
    pronunciation: 'MOR-gen - Short O, rolled R, soft G.'
  },
  {
    id: 'gestern',
    word: 'gestern',
    translation: 'yesterday',
    difficulty: 'Beginner',
    gender: '',
    example: 'Gestern hat es geregnet.',
    exampleTranslation: 'Yesterday it rained.',
    pronunciation: 'GESS-tern - Hard G, rhymes with western.'
  },
  {
    id: 'jetzt',
    word: 'jetzt',
    translation: 'now',
    difficulty: 'Beginner',
    gender: '',
    example: 'Jetzt bin ich bereit.',
    exampleTranslation: 'Now I am ready.',
    pronunciation: 'yetst - Rhymes with English \"let\'s\" with a Y start.'
  },
  {
    id: 'hier',
    word: 'hier',
    translation: 'here',
    difficulty: 'Beginner',
    gender: '',
    example: 'Komm hierher, bitte.',
    exampleTranslation: 'Come here, please.',
    pronunciation: 'heer - Sounds like English \"hear\".'
  },
  {
    id: 'dort',
    word: 'dort',
    translation: 'there',
    difficulty: 'Beginner',
    gender: '',
    example: 'Dort steht die Kirche.',
    exampleTranslation: 'The church stands there.',
    pronunciation: 'dort - Short O, crisp rt.'
  },
  {
    id: 'warum',
    word: 'warum',
    translation: 'why',
    difficulty: 'Beginner',
    gender: '',
    example: 'Warum machst du das?',
    exampleTranslation: 'Why are you doing that?',
    pronunciation: 'vah-ROOM - V-sound, open \"ah\", deep \"room\".'
  },
  {
    id: 'wann',
    word: 'wann',
    translation: 'when',
    difficulty: 'Beginner',
    gender: '',
    example: 'Wann fahren wir los?',
    exampleTranslation: 'When are we setting off?',
    pronunciation: 'vahn - V-sound, open short \"ah\", double N.'
  },
  {
    id: 'wo',
    word: 'wo',
    translation: 'where',
    difficulty: 'Beginner',
    gender: '',
    example: 'Wo wohnst du?',
    exampleTranslation: 'Where do you live?',
    pronunciation: 'voh - V-sound, long close O.'
  },
  {
    id: 'wie',
    word: 'wie',
    translation: 'how',
    difficulty: 'Beginner',
    gender: '',
    example: 'Wie geht es dir?',
    exampleTranslation: 'How are you?',
    pronunciation: 'vee - V-sound, sounds like English \"bee\".'
  },
  {
    id: 'wer',
    word: 'wer',
    translation: 'who',
    difficulty: 'Beginner',
    gender: '',
    example: 'Wer ist dieser Mann?',
    exampleTranslation: 'Who is this man?',
    pronunciation: 'vair - V-sound, sounds like English \"ware\".'
  },
  {
    id: 'was',
    word: 'was',
    translation: 'what',
    difficulty: 'Beginner',
    gender: '',
    example: 'Was willst du tun?',
    exampleTranslation: 'What do you want to do?',
    pronunciation: 'vahs - V-sound, open A, sounding like \"vahs\".'
  },
  {
    id: 'der',
    word: 'der',
    translation: 'the (masculine)',
    difficulty: 'Beginner',
    gender: 'der',
    example: 'Der Mann liest ein Buch.',
    exampleTranslation: 'The man is reading a book.',
    pronunciation: 'dair - Sounds like English \"dare\".'
  },
  {
    id: 'die',
    word: 'die',
    translation: 'the (feminine/plural)',
    difficulty: 'Beginner',
    gender: 'die',
    example: 'Die Frau lacht.',
    exampleTranslation: 'The woman is laughing.',
    pronunciation: 'dee - Sounds like English \"dee\".'
  },
  {
    id: 'das',
    word: 'das',
    translation: 'the (neuter)',
    difficulty: 'Beginner',
    gender: 'das',
    example: 'Das Kind spielt draußen.',
    exampleTranslation: 'The child plays outside.',
    pronunciation: 'dahs - Sounds like \"dahs\".'
  },
  {
    id: 'ein',
    word: 'ein',
    translation: 'a / an (masculine/neuter)',
    difficulty: 'Beginner',
    gender: '',
    example: 'Ich habe ein Buch gekauft.',
    exampleTranslation: 'I bought a book.',
    pronunciation: 'ighn - Sounds like English \"line\" without L.'
  },
  {
    id: 'eine',
    word: 'eine',
    translation: 'a / an (feminine)',
    difficulty: 'Beginner',
    gender: '',
    example: 'Das ist eine Katze.',
    exampleTranslation: 'That is a cat.',
    pronunciation: 'IGH-neh - \"Eye\" + short \"neh\".'
  },
  {
    id: 'und',
    word: 'und',
    translation: 'and',
    difficulty: 'Beginner',
    gender: '',
    example: 'Du und ich sind Freunde.',
    exampleTranslation: 'You and I are friends.',
    pronunciation: 'oont - Short U, ending in crisp T sound.'
  },
  {
    id: 'aber',
    word: 'aber',
    translation: 'but',
    difficulty: 'Beginner',
    gender: '',
    example: 'Ich will kommen, aber ich kann nicht.',
    exampleTranslation: 'I want to come, but I cannot.',
    pronunciation: 'AH-ber - Start with \"ah\", soft ending.'
  },
  {
    id: 'oder',
    word: 'oder',
    translation: 'or',
    difficulty: 'Beginner',
    gender: '',
    example: 'Kaffee oder Tee?',
    exampleTranslation: 'Coffee or tea?',
    pronunciation: 'OH-der - Long close O, soft \"der\".'
  },
  {
    id: 'mit',
    word: 'mit',
    translation: 'with',
    difficulty: 'Beginner',
    gender: '',
    example: 'Kommst du mit mir?',
    exampleTranslation: 'Are you coming with me?',
    pronunciation: 'mit - Short i, crisp T.'
  },
  {
    id: 'fuer',
    word: 'für',
    translation: 'for',
    difficulty: 'Beginner',
    gender: '',
    example: 'Dieses Geschenk ist für dich.',
    exampleTranslation: 'This gift is for you.',
    pronunciation: 'feer - Say \"fee\" with rounded lips.'
  },
  {
    id: 'auf',
    word: 'auf',
    translation: 'on / onto / at',
    difficulty: 'Beginner',
    gender: '',
    example: 'Das Buch liegt auf dem Tisch.',
    exampleTranslation: 'The book is lying on the table.',
    pronunciation: 'owf - Rhymes with English \"cowf\".'
  },
  {
    id: 'in',
    word: 'in',
    translation: 'in / into',
    difficulty: 'Beginner',
    gender: '',
    example: 'Wir wohnen in einer Wohnung.',
    exampleTranslation: 'We live in an apartment.',
    pronunciation: 'in - Short i, nasal N.'
  },
  {
    id: 'an',
    word: 'an',
    translation: 'at / on / to',
    difficulty: 'Beginner',
    gender: '',
    example: 'Das Bild hängt an der Wand.',
    exampleTranslation: 'The picture hangs on the wall.',
    pronunciation: 'ahn - Open short A.'
  },
  {
    id: 'von',
    word: 'von',
    translation: 'of / from',
    difficulty: 'Beginner',
    gender: '',
    example: 'Das ist das Auto von meinem Vater.',
    exampleTranslation: 'This is my father\'s car.',
    pronunciation: 'fon - F-sound, short O, nasal N.'
  },
  {
    id: 'zu',
    word: 'zu',
    translation: 'to / at / too',
    difficulty: 'Beginner',
    gender: '',
    example: 'Ich gehe zu Fuß.',
    exampleTranslation: 'I am walking.',
    pronunciation: 'tsoo - TS-sound + \"oo\".'
  },
  {
    id: 'aus',
    word: 'aus',
    translation: 'out of / from',
    difficulty: 'Beginner',
    gender: '',
    example: 'Sie kommt aus der Schweiz.',
    exampleTranslation: 'She comes from Switzerland.',
    pronunciation: 'ows - Rhymes with English \"house\".'
  },
  {
    id: 'Tag',
    word: 'Tag',
    translation: 'day',
    difficulty: 'Beginner',
    gender: 'der',
    example: 'Einen schönen Tag noch!',
    exampleTranslation: 'Have a nice day!',
    pronunciation: 'tahk - T-sound, long open A, hard K-sound at end.'
  },
  {
    id: 'Nacht',
    word: 'Nacht',
    translation: 'night',
    difficulty: 'Beginner',
    gender: 'die',
    example: 'Gute Nacht, schlaf gut.',
    exampleTranslation: 'Good night, sleep well.',
    pronunciation: 'nakht - Open short A + throat ch.'
  },
  {
    id: 'Haus',
    word: 'Haus',
    translation: 'house',
    difficulty: 'Beginner',
    gender: 'das',
    example: 'Wir kochen heute im Haus.',
    exampleTranslation: 'We are cooking in the house today.',
    pronunciation: 'hows - Sounds like English \"house\".'
  },
  {
    id: 'Wasser',
    word: 'Wasser',
    translation: 'water',
    difficulty: 'Beginner',
    gender: 'das',
    example: 'Ein Glas Wasser bitte.',
    exampleTranslation: 'A glass of water please.',
    pronunciation: 'VAHS-ser - V-sound, open short A, soft double S.'
  },
  {
    id: 'Essen',
    word: 'Essen',
    translation: 'food / meal',
    difficulty: 'Beginner',
    gender: 'das',
    example: 'Das Essen schmeckt lecker.',
    exampleTranslation: 'The food tastes delicious.',
    pronunciation: 'ESS-en - Short E, soft S, quiet ending.'
  },
  {
    id: 'Brot',
    word: 'Brot',
    translation: 'bread',
    difficulty: 'Beginner',
    gender: 'das',
    example: 'Zum Frühstück esse ich Brot.',
    exampleTranslation: 'At breakfast I eat bread.',
    pronunciation: 'broht - Rolled R, long close O, crisp T.'
  },
  {
    id: 'Mann',
    word: 'Mann',
    translation: 'man',
    difficulty: 'Beginner',
    gender: 'der',
    example: 'Wer ist jener Mann?',
    exampleTranslation: 'Who is that man?',
    pronunciation: 'mahn - Sounds like English \"mon\" in monster.'
  },
  {
    id: 'Frau',
    word: 'Frau',
    translation: 'woman / Mrs',
    difficulty: 'Beginner',
    gender: 'die',
    example: 'Diese Frau arbeitet viel.',
    exampleTranslation: 'This woman works a lot.',
    pronunciation: 'frow - Rolled R, sounds like \"frow\".'
  },
  {
    id: 'Kind',
    word: 'Kind',
    translation: 'child',
    difficulty: 'Beginner',
    gender: 'das',
    example: 'Das Kind lacht fröhlich.',
    exampleTranslation: 'The child is laughing happily.',
    pronunciation: 'kint - Short i, ends with a crisp T sound.'
  },
  {
    id: 'Apfel',
    word: 'Apfel',
    translation: 'apple',
    difficulty: 'Beginner',
    gender: 'der',
    example: 'Ich esse einen Apfel.',
    exampleTranslation: 'I am eating an apple.',
    pronunciation: 'AHP-fel - Short A, clear P and F.'
  },

  // --- INTERMEDIATE (80 words) ---
  {
    id: 'denken',
    word: 'denken',
    translation: 'to think',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Ich denke, das ist wahr.',
    exampleTranslation: 'I think that is true.',
    pronunciation: 'DEN-ken - Rhymes with English \"Ben\" + \"ken\".'
  },
  {
    id: 'wissen',
    word: 'wissen',
    translation: 'to know (facts)',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Ich weiß es nicht.',
    exampleTranslation: 'I do not know it.',
    pronunciation: 'VISS-en - V-sound, short i, soft double S.'
  },
  {
    id: 'fragen',
    word: 'fragen',
    translation: 'to ask',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Darf ich dich fragen?',
    exampleTranslation: 'May I ask you?',
    pronunciation: 'FRAH-gen - Rolled R, open A.'
  },
  {
    id: 'antworten',
    word: 'antworten',
    translation: 'to answer',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Er antwortet mir.',
    exampleTranslation: 'He answers me.',
    pronunciation: 'AHNT-vor-ten - Open A, V-sound for \"vor\".'
  },
  {
    id: 'lesen',
    word: 'lesen',
    translation: 'to read',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Sie liest gerne Bücher.',
    exampleTranslation: 'She likes reading books.',
    pronunciation: 'LAY-zen - Long close E, voiced S (Z-sound).'
  },
  {
    id: 'schreiben',
    word: 'schreiben',
    translation: 'to write',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Schreib einen Brief.',
    exampleTranslation: 'Write a letter.',
    pronunciation: 'SHRIGH-ben - Sh + rolled r + \"eye\" + ben.'
  },
  {
    id: 'hoeren',
    word: 'hören',
    translation: 'to hear / listen',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Hörst du diese Musik?',
    exampleTranslation: 'Do you hear this music?',
    pronunciation: 'HURN-en - Rounded O-umlaut, say \"her\" with pursed lips.'
  },
  {
    id: 'sprechen',
    word: 'sprechen',
    translation: 'to speak / talk',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Ich spreche ein wenig Deutsch.',
    exampleTranslation: 'I speak a little German.',
    pronunciation: 'SHPREKH-en - Sh + p + rolled r + e + soft ch.'
  },
  {
    id: 'spielen',
    word: 'spielen',
    translation: 'to play',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Die Kinder spielen im Garten.',
    exampleTranslation: 'The children play in the garden.',
    pronunciation: 'SHPEE-len - Sh + p + long close i.'
  },
  {
    id: 'essen',
    word: 'essen',
    translation: 'to eat',
    difficulty: 'Intermediate',
    gender: '',
    partOfSpeech: 'verb',
    example: 'Wir essen Pizza.',
    exampleTranslation: 'We are eating pizza.',
    pronunciation: 'ESS-en - Short E, soft double S.'
  },
  {
    id: 'trinken',
    word: 'trinken',
    translation: 'to drink',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Trinkst du ein Bier?',
    exampleTranslation: 'Are you drinking a beer?',
    pronunciation: 'TRING-ken - Rolled R, nasal ng, crisp K.'
  },
  {
    id: 'schlafen',
    word: 'schlafen',
    translation: 'to sleep',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Das Baby muss schlafen.',
    exampleTranslation: 'The baby needs to sleep.',
    pronunciation: 'SHLAH-fen - Sh + long A.'
  },
  {
    id: 'kaufen',
    word: 'kaufen',
    translation: 'to buy',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Ich kaufe Brot auf dem Markt.',
    exampleTranslation: 'I buy bread at the market.',
    pronunciation: 'KOW-fen - Say \"cow\" + \"fen\".'
  },
  {
    id: 'arbeiten',
    word: 'arbeiten',
    translation: 'to work',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Ich arbeite heute nicht.',
    exampleTranslation: 'I am not working today.',
    pronunciation: 'AHR-by-ten - Ar + \"by\" + ten.'
  },
  {
    id: 'lernen',
    word: 'lernen',
    translation: 'to learn / study',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Deutsch lernen macht Spaß!',
    exampleTranslation: 'Learning German is fun!',
    pronunciation: 'LAIR-nen - Rhymes with English \"burn\" with L and rolled R.'
  },
  {
    id: 'helfen',
    word: 'helfen',
    translation: 'to help',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Kannst du mir helfen?',
    exampleTranslation: 'Can you help me?',
    pronunciation: 'HEL-fen - Crisp H, clear L, soft ending.'
  },
  {
    id: 'suchen',
    word: 'suchen',
    translation: 'to search / look for',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Ich suche meine Brille.',
    exampleTranslation: 'I am looking for my glasses.',
    pronunciation: 'ZOO-khen - Soft Z, long U, deep throat ch.'
  },
  {
    id: 'finden',
    word: 'finden',
    translation: 'to find',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Wo finde ich den Bahnhof?',
    exampleTranslation: 'Where can I find the train station?',
    pronunciation: 'FIN-den - Short i, nasal N, den ending.'
  },
  {
    id: 'ueber',
    word: 'über',
    translation: 'over / above / about',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Wir sprechen über das Treffen.',
    exampleTranslation: 'We are talking about the meeting.',
    pronunciation: 'EW-ber - Rounded u-umlaut + ber.'
  },
  {
    id: 'unter',
    word: 'unter',
    translation: 'under / below / among',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Der Hund liegt unter dem Tisch.',
    exampleTranslation: 'The dog is lying under the table.',
    pronunciation: 'OON-ter - Short O-like U, soft ending.'
  },
  {
    id: 'vor',
    word: 'vor',
    translation: 'before / in front of',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Das Auto steht vor dem Haus.',
    exampleTranslation: 'The car is in front of the house.',
    pronunciation: 'for - Sounds exactly like English \"for\" with a soft r.'
  },
  {
    id: 'nach',
    word: 'nach',
    translation: 'after / towards / to',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Nach dem Essen gehen wir raus.',
    exampleTranslation: 'After eating, we go out.',
    pronunciation: "nakh - German 'ch' sound."
  },
  {
    id: 'bei',
    word: 'bei',
    translation: 'at / by / near',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Er wohnt bei seinen Eltern.',
    exampleTranslation: 'He lives with his parents.',
    pronunciation: 'by - Sounds like English \"by\".'
  },
  {
    id: 'durch',
    word: 'durch',
    translation: 'through / by',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Wir gehen durch den Wald.',
    exampleTranslation: 'We walk through the forest.',
    pronunciation: "doorkh - Deep U, soft 'ch' sound."
  },
  {
    id: 'ohne',
    word: 'ohne',
    translation: 'without',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Tee ohne Zucker, bitte.',
    exampleTranslation: 'Tea without sugar, please.',
    pronunciation: 'OH-neh - Long close O, silent H.'
  },
  {
    id: 'gegen',
    word: 'gegen',
    translation: 'against / towards',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Ich bin gegen diesen Vorschlag.',
    exampleTranslation: 'I am against this proposal.',
    pronunciation: 'GAY-gen - Hard G, long close E, soft second G.'
  },
  {
    id: 'wenn',
    word: 'wenn',
    translation: 'if / when',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Wenn das Wetter schön ist, gehen wir spazieren.',
    exampleTranslation: 'If the weather is nice, we walk.',
    pronunciation: 'ven - V-sound, short E.'
  },
  {
    id: 'weil',
    word: 'weil',
    translation: 'because',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Ich lerne Deutsch, weil ich in Deutschland wohne.',
    exampleTranslation: 'I learn German because I live in Germany.',
    pronunciation: 'vile - V-sound, sounds like English \"vile\".'
  },
  {
    id: 'dass',
    word: 'dass',
    translation: 'that (conjunction)',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Er sagte, dass er müde ist.',
    exampleTranslation: 'He said that he is tired.',
    pronunciation: 'dahs - Short A + soft double S.'
  },
  {
    id: 'oder_int',
    word: 'oder',
    translation: 'or',
    difficulty: 'Intermediate',
    gender: '',
    example: 'Heute oder morgen?',
    exampleTranslation: 'Today or tomorrow?',
    pronunciation: 'OH-der - Long O, soft R.'
  },
  {
    id: 'Zeit',
    word: 'Zeit',
    translation: 'time',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Ich habe im Moment keine Zeit.',
    exampleTranslation: 'I have no time at the moment.',
    pronunciation: 'tsight - TS-sound + \"sight\".'
  },
  {
    id: 'Woche',
    word: 'Woche',
    translation: 'week',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Diese Woche ist voller Arbeit.',
    exampleTranslation: 'This week is full of work.',
    pronunciation: 'VOKH-eh - V-sound, short O, soft ch.'
  },
  {
    id: 'Monat',
    word: 'Monat',
    translation: 'month',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Der Monat Juni ist schön.',
    exampleTranslation: 'The month of June is beautiful.',
    pronunciation: 'MOH-naht - Long close O, long A.'
  },
  {
    id: 'Jahr',
    word: 'Jahr',
    translation: 'year',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Ich wünsche dir ein frohes neues Jahr!',
    exampleTranslation: 'I wish you a happy New Year!',
    pronunciation: 'yahr - Y-sound, long close A, silent H.'
  },
  {
    id: 'Stunde',
    word: 'Stunde',
    translation: 'hour',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Das Meeting dauert eine Stunde.',
    exampleTranslation: 'The meeting lasts one hour.',
    pronunciation: 'SHTOON-deh - Sh + T + oo + N + deh.'
  },
  {
    id: 'Stadt',
    word: 'Stadt',
    translation: 'city / town',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'München ist eine schöne Stadt.',
    exampleTranslation: 'Munich is a beautiful city.',
    pronunciation: 'shtat - Sh + T + short A, crisp T.'
  },
  {
    id: 'Land',
    word: 'Land',
    translation: 'country / land',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Dieses Land ist sehr groß.',
    exampleTranslation: 'This country is very large.',
    pronunciation: 'lahnt - German short A, ends with crisp T sound.'
  },
  {
    id: 'Auto',
    word: 'Auto',
    translation: 'car',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Er kauft ein neues Auto.',
    exampleTranslation: 'He is buying a new car.',
    pronunciation: 'OW-toh - \"Ow\" in cow + \"toe\".'
  },
  {
    id: 'Buch',
    word: 'Buch',
    translation: 'book',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Das Buch liegt auf dem Regal.',
    exampleTranslation: 'The book is on the shelf.',
    pronunciation: 'bookh - Long U, deep ch throat sound.'
  },
  {
    id: 'Geld',
    word: 'Geld',
    translation: 'money',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Ich muss ein wenig Geld abheben.',
    exampleTranslation: 'I must withdraw some money.',
    pronunciation: 'gelt - Hard G, short E, ends in T sound.'
  },
  {
    id: 'Arbeit',
    word: 'Arbeit',
    translation: 'work / job',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Die Arbeit gefällt mir sehr.',
    exampleTranslation: 'I like the work very much.',
    pronunciation: 'AHR-bite - Ar + \"bite\".'
  },
  {
    id: 'Schule',
    word: 'Schule',
    translation: 'school',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Die Kinder gehen zur Schule.',
    exampleTranslation: 'The children go to school.',
    pronunciation: 'SHOO-leh - Sh + long U + leh.'
  },
  {
    id: 'Familie',
    word: 'Familie',
    translation: 'family',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Ich liebe meine Familie.',
    exampleTranslation: 'I love my family.',
    pronunciation: 'fah-MEEL-yeh - Fah + meel + yeh.'
  },
  {
    id: 'Freund',
    word: 'Freund',
    translation: 'friend',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Er ist mein bester Freund.',
    exampleTranslation: 'He is my best friend.',
    pronunciation: 'froynt - Fr + \"oy\" + nt.'
  },
  {
    id: 'Name',
    word: 'Name',
    translation: 'name',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Mein Name ist Markus.',
    exampleTranslation: 'My name is Markus.',
    pronunciation: 'NAH-meh - Long A, short E ending.'
  },
  {
    id: 'Nummer',
    word: 'Nummer',
    translation: 'number',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Wie ist deine Handynummer?',
    exampleTranslation: 'What is your cell number?',
    pronunciation: 'NOOM-mer - Short rounded U, double m.'
  },
  {
    id: 'Tuer',
    word: 'Tür',
    translation: 'door',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Mach bitte die Tür zu.',
    exampleTranslation: 'Please close the door.',
    pronunciation: "teer - Say 'tee' with lips rounded to 'oo'."
  },
  {
    id: 'Fenster',
    word: 'Fenster',
    translation: 'window',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Mach bitte das Fenster auf.',
    exampleTranslation: 'Please open the window.',
    pronunciation: 'FEN-ster - Crisp F, short E, ster.'
  },
  {
    id: 'Tisch',
    word: 'Tisch',
    translation: 'table',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Das Essen steht auf dem Tisch.',
    exampleTranslation: 'The food is on the table.',
    pronunciation: 'tish - Sounds like English \"dish\" but with a T.'
  },
  {
    id: 'Stuhl',
    word: 'Stuhl',
    translation: 'chair',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Ich sitze auf einem bequemen Stuhl.',
    exampleTranslation: 'I am sitting on a comfortable chair.',
    pronunciation: 'shtool - Sh + T + long U + rolling L.'
  },
  {
    id: 'Bett',
    word: 'Bett',
    translation: 'bed',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Ich gehe gleich ins Bett.',
    exampleTranslation: 'I am going to bed shortly.',
    pronunciation: 'bet - Same as English \"bet\".'
  },
  {
    id: 'Telefon',
    word: 'Telefon',
    translation: 'telephone / phone',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Das Telefon klingelt.',
    exampleTranslation: 'The phone is ringing.',
    pronunciation: 'tel-eh-FOHN - Long close O.'
  },
  {
    id: 'Strasse',
    word: 'Straße',
    translation: 'street / road',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Diese Straße ist sehr breit.',
    exampleTranslation: 'This street is very wide.',
    pronunciation: 'SHTRAH-seh - Sh + T + rolled R + long A + seh.'
  },
  {
    id: 'Bahnhof',
    word: 'Bahnhof',
    translation: 'train station',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Wo ist der Bahnhof?',
    exampleTranslation: 'Where is the train station?',
    pronunciation: 'BAHN-hohf - \"Bahn\" (open A) + \"hohf\" (long O).'
  },
  {
    id: 'Supermarkt',
    word: 'Supermarkt',
    translation: 'supermarket',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Ich kaufe im Supermarkt ein.',
    exampleTranslation: 'I shop in the supermarket.',
    pronunciation: 'ZOO-per-markt - Soft Z, open A in markt.'
  },
  {
    id: 'Restaurant',
    word: 'Restaurant',
    translation: 'restaurant',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Das Restaurant ist heute geschlossen.',
    exampleTranslation: 'The restaurant is closed today.',
    pronunciation: 'res-tow-RAHNT - French-like ending.'
  },
  {
    id: 'Zimmer',
    word: 'Zimmer',
    translation: 'room',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Mein Zimmer ist aufgeräumt.',
    exampleTranslation: 'My room is cleaned up.',
    pronunciation: 'TSIM-mer - TS-sound + short i + mer.'
  },
  {
    id: 'Kueche',
    word: 'Küche',
    translation: 'kitchen',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Die Küche riecht gut.',
    exampleTranslation: 'The kitchen smells good.',
    pronunciation: 'KEW-kheh - Rounded U + soft ch.'
  },
  {
    id: 'Schluessel',
    word: 'Schlüssel',
    translation: 'key',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Ich habe meinen Schlüssel verloren.',
    exampleTranslation: 'I lost my key.',
    pronunciation: 'SHLEW-sel - Sh + rounded short U + sel.'
  },
  {
    id: 'Brief',
    word: 'Brief',
    translation: 'letter',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Ich schreibe einen Brief an meine Oma.',
    exampleTranslation: 'I am writing a letter to my grandma.',
    pronunciation: 'breef - Sounds exactly like English \"brief\".'
  },
  {
    id: 'Musik',
    word: 'Musik',
    translation: 'music',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Ich höre gerne Musik.',
    exampleTranslation: 'I like listening to music.',
    pronunciation: 'moo-ZEEK - Soft Z, long close E.'
  },
  {
    id: 'Film',
    word: 'Film',
    translation: 'movie / film',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Der Film war sehr traurig.',
    exampleTranslation: 'The movie was very sad.',
    pronunciation: 'film - Sounds exactly like \"film\".'
  },
  {
    id: 'Sport',
    word: 'Sport',
    translation: 'sports',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Er treibt jeden Tag Sport.',
    exampleTranslation: 'He does sports every day.',
    pronunciation: 'shport - Sh + P + short O + crisp rt.'
  },
  {
    id: 'Spiel_noun',
    word: 'Spiel',
    translation: 'game / play',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Das Spiel ist fast vorbei.',
    exampleTranslation: 'The game is almost over.',
    pronunciation: 'shpeel - Sh + P + long close I.'
  },
  {
    id: 'Reise',
    word: 'Reise',
    translation: 'trip / journey',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Gute Reise!',
    exampleTranslation: 'Have a good trip!',
    pronunciation: 'RY-zeh - \"Rye\" + voiced S (Z-sound) + eh.'
  },
  {
    id: 'Wetter',
    word: 'Wetter',
    translation: 'weather',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Wie ist das Wetter heute?',
    exampleTranslation: 'How is the weather today?',
    pronunciation: 'VET-ter - V-sound, short E, soft ter.'
  },
  {
    id: 'Sonne',
    word: 'Sonne',
    translation: 'sun',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Die Sonne scheint hell.',
    exampleTranslation: 'The sun shines brightly.',
    pronunciation: 'ZON-neh - Voiced S (Z-sound), short O, neh.'
  },
  {
    id: 'Regen',
    word: 'Regen',
    translation: 'rain',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Der Regen wäscht die Straßen.',
    exampleTranslation: 'The rain washes the streets.',
    pronunciation: 'RAY-gen - Long close E, rolling R, gen.'
  },
  {
    id: 'Wind',
    word: 'Wind',
    translation: 'wind',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Ein kalter Wind weht.',
    exampleTranslation: 'A cold wind is blowing.',
    pronunciation: 'vint - V-sound, short i, ends with crisp T sound.'
  },
  {
    id: 'Schnee',
    word: 'Schnee',
    translation: 'snow',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Die Berge sind voller Schnee.',
    exampleTranslation: 'The mountains are full of snow.',
    pronunciation: 'shnay - Sh + long close E.'
  },
  {
    id: 'Himmel',
    word: 'Himmel',
    translation: 'sky / heaven',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Der Himmel ist heute blau.',
    exampleTranslation: 'The sky is blue today.',
    pronunciation: 'HIM-mel - Crisp H, short i, mel.'
  },
  {
    id: 'Erde',
    word: 'Erde',
    translation: 'earth / soil',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Die Erde kreist um die Sonne.',
    exampleTranslation: 'The earth orbits the sun.',
    pronunciation: 'AIR-deh - Air + deh.'
  },
  {
    id: 'Meer',
    word: 'Meer',
    translation: 'sea / ocean',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Wir fahren im Sommer ans Meer.',
    exampleTranslation: 'We are traveling to the sea this summer.',
    pronunciation: 'mair - Soft R, sounds like English \"mare\".'
  },
  {
    id: 'Berg',
    word: 'Berg',
    translation: 'mountain',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Die Zugspitze ist ein hoher Berg.',
    exampleTranslation: 'The Zugspitze is a high mountain.',
    pronunciation: 'berk - Rolled R, ending with K sound.'
  },
  {
    id: 'Fluss',
    word: 'Fluss',
    translation: 'river',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Der Rhein ist ein großer Fluss.',
    exampleTranslation: 'The Rhine is a large river.',
    pronunciation: 'floos - Rolled R, short U, soft S.'
  },
  {
    id: 'Tier',
    word: 'Tier',
    translation: 'animal',
    difficulty: 'Intermediate',
    gender: 'das',
    example: 'Welches Tier magst du am meisten?',
    exampleTranslation: 'Which animal do you like the most?',
    pronunciation: 'teer - Sound like English \"tear\" but crisp T.'
  },
  {
    id: 'Hund',
    word: 'Hund',
    translation: 'dog',
    difficulty: 'Intermediate',
    gender: 'der',
    example: 'Der Hund bellt laut.',
    exampleTranslation: 'The dog barks loudly.',
    pronunciation: 'hoont - Soft rounded U, ending with crisp T sound.'
  },
  {
    id: 'Katze',
    word: 'Katze',
    translation: 'cat',
    difficulty: 'Intermediate',
    gender: 'die',
    example: 'Die Katze schläft auf dem Sofa.',
    exampleTranslation: 'The cat sleeps on the sofa.',
    pronunciation: 'KAHT-tseh - Open A, crisp TS-sound + eh.'
  },

  // --- HARD (50 words) ---
  {
    id: 'verkaufen',
    word: 'verkaufen',
    translation: 'to sell',
    difficulty: 'Hard',
    gender: '',
    example: 'Er möchte sein altes Haus verkaufen.',
    exampleTranslation: 'He wants to sell his old house.',
    pronunciation: 'fair-KOW-fen - F-sound for \"ver\" + kow-fen.'
  },
  {
    id: 'Krankenhaus',
    word: 'Krankenhaus',
    translation: 'hospital',
    difficulty: 'Hard',
    gender: 'das',
    example: 'Sie liegt im Krankenhaus.',
    exampleTranslation: 'She is in the hospital.',
    pronunciation: 'KRANG-ken-hows - Literally \"sick-house\".'
  },
  {
    id: 'Hotel',
    word: 'Hotel',
    translation: 'hotel',
    difficulty: 'Hard',
    gender: 'das',
    example: 'Wir buchen ein Zimmer im Hotel.',
    exampleTranslation: 'We are booking a room at the hotel.',
    pronunciation: 'hoh-TEL - Stress on the second syllable.'
  },
  {
    id: 'Flughafen',
    word: 'Flughafen',
    translation: 'airport',
    difficulty: 'Hard',
    gender: 'der',
    example: 'Mein Flug geht vom Flughafen Frankfurt.',
    exampleTranslation: 'My flight is from Frankfurt airport.',
    pronunciation: 'FLOOCH-hah-fen - Literally \"flight-harbor\".'
  },
  {
    id: 'Kirche',
    word: 'Kirche',
    translation: 'church',
    difficulty: 'Hard',
    gender: 'die',
    example: 'Sonntags klingen die Glocken der Kirche.',
    exampleTranslation: 'On Sundays, the church bells ring.',
    pronunciation: 'KEER-kheh - Soft R, followed by soft ch.'
  },
  {
    id: 'Park',
    word: 'Park',
    translation: 'park',
    difficulty: 'Hard',
    gender: 'der',
    example: 'Wir gehen im Park spazieren.',
    exampleTranslation: 'We are going for a walk in the park.',
    pronunciation: 'park - Rolled R, crisp K.'
  },
  {
    id: 'Garten',
    word: 'Garten',
    translation: 'garden',
    difficulty: 'Hard',
    gender: 'der',
    example: 'Der Garten blüht wunderbar.',
    exampleTranslation: 'The garden blooms beautifully.',
    pronunciation: 'GAHR-ten - German A, rolled R.'
  },
  {
    id: 'Bad',
    word: 'Bad',
    translation: 'bath / bathroom',
    difficulty: 'Hard',
    gender: 'das',
    example: 'Ich nehme ein heißes Bad.',
    exampleTranslation: 'I\'m taking a hot bath.',
    pronunciation: 'baht - Long A, ends in crisp T sound.'
  },
  {
    id: 'Treppe',
    word: 'Treppe',
    translation: 'stairs / staircase',
    difficulty: 'Hard',
    gender: 'die',
    example: 'Wir steigen die Treppe hinauf.',
    exampleTranslation: 'We are climbing up the stairs.',
    pronunciation: 'TREP-peh - Rolled R, short E, double P.'
  },
  {
    id: 'Paket',
    word: 'Paket',
    translation: 'package / parcel',
    difficulty: 'Hard',
    gender: 'das',
    example: 'Der Postbote brachte ein Paket.',
    exampleTranslation: 'The mailman brought a package.',
    pronunciation: 'pah-KAYT - Open A, long E-sound + crisp T.'
  },
  {
    id: 'Zeitung',
    word: 'Zeitung',
    translation: 'newspaper',
    difficulty: 'Hard',
    gender: 'die',
    example: 'Ich lese die Zeitung beim Frühstück.',
    exampleTranslation: 'I read the newspaper at breakfast.',
    pronunciation: 'TSIGH-toong - TS-sound, sigh + toong.'
  },
  {
    id: 'Urlaub',
    word: 'Urlaub',
    translation: 'vacation / holiday',
    difficulty: 'Hard',
    gender: 'der',
    example: 'Wir machen Urlaub in Spanien.',
    exampleTranslation: 'We are taking a vacation in Spain.',
    pronunciation: 'OOR-lowp - \"Oor\" + cow-like \"low\" with a P at end.'
  },
  {
    id: 'Vogel',
    word: 'Vogel',
    translation: 'bird',
    difficulty: 'Hard',
    gender: 'der',
    example: 'Ein Vogel singt auf dem Ast.',
    exampleTranslation: 'A bird is singing on the branch.',
    pronunciation: 'FOH-gel - F-sound, long close O, gel.'
  },
  {
    id: 'Baum',
    word: 'Baum',
    translation: 'tree',
    difficulty: 'Hard',
    gender: 'der',
    example: 'Der Baum hat grüne Blätter.',
    exampleTranslation: 'The tree has green leaves.',
    pronunciation: 'bowm - Sounds like English \"how\" with a B + M.'
  },
  {
    id: 'Blume',
    word: 'Blume',
    translation: 'flower',
    difficulty: 'Hard',
    gender: 'die',
    example: 'Sie schenkt ihr eine schöne Blume.',
    exampleTranslation: 'She gives her a beautiful flower.',
    pronunciation: 'BLOO-meh - Long U, short E ending.'
  },
  {
    id: 'Rot',
    word: 'Rot',
    translation: 'Red',
    difficulty: 'Beginner',
    gender: 'das',
    example: 'Das Auto ist rot.',
    exampleTranslation: 'The car is red.',
    pronunciation: 'roht - Rolled R, long close O, crisp T.'
  },
  {
    id: 'Blau',
    word: 'Blau',
    translation: 'Blue',
    difficulty: 'Beginner',
    gender: 'das',
    example: 'Der Himmel ist blau.',
    exampleTranslation: 'The sky is blue.',
    pronunciation: 'blow - Bl + au (sounds like cow).'
  },
  {
    id: 'Gruen',
    word: 'Grün',
    translation: 'Green',
    difficulty: 'Beginner',
    gender: 'das',
    example: 'Die Wiese ist grün.',
    exampleTranslation: 'The meadow is green.',
    pronunciation: "green - Say 'gree' with lips rounded to 'oo'."
  },
  {
    id: 'Schwarz',
    word: 'Schwarz',
    translation: 'Black',
    difficulty: 'Beginner',
    gender: 'das',
    example: 'Die Katze ist schwarz.',
    exampleTranslation: 'The cat is black.',
    pronunciation: 'shvarts - Sh + V-sound + arts.'
  },
  {
    id: 'Weiss',
    word: 'Weiß',
    translation: 'White',
    difficulty: 'Beginner',
    gender: 'das',
    example: 'Der Schnee ist weiß.',
    exampleTranslation: 'The snow is white.',
    pronunciation: 'vice - V-sound, rhymes with English \"rice\".'
  },
  {
    id: 'Wichtig',
    word: 'wichtig',
    translation: 'important',
    difficulty: 'Hard',
    gender: '',
    example: 'Das ist eine wichtige Nachricht.',
    exampleTranslation: 'That is an important message.',
    pronunciation: 'VIKH-tikh - V-sound, short I, throat ch, tikh.'
  },
  {
    id: 'Moeglich',
    word: 'möglich',
    translation: 'possible',
    difficulty: 'Hard',
    gender: '',
    example: 'Ist das morgen möglich?',
    exampleTranslation: 'Is that possible tomorrow?',
    pronunciation: 'MURG-likh - Rounded O + lick + soft ch.'
  },
  {
    id: 'Einfach',
    word: 'einfach',
    translation: 'easy / simple',
    difficulty: 'Hard',
    gender: '',
    example: 'Das ist eine einfache Frage.',
    exampleTranslation: 'That is a simple question.',
    pronunciation: 'IGHN-fakh - \"Eye-n\" + fakh.'
  },
  {
    id: 'Schwierig',
    word: 'schwierig',
    translation: 'difficult / hard',
    difficulty: 'Hard',
    gender: '',
    example: 'Deutsch ist ein bisschen schwierig.',
    exampleTranslation: 'German is a bit difficult.',
    pronunciation: "SHVEE-rikh - Sh + V-sound + ee + R + soft 'ch'."
  },
  {
    id: 'Schoen',
    word: 'schön',
    translation: 'beautiful / nice',
    difficulty: 'Hard',
    gender: '',
    example: 'Vielen Dank für das schöne Geschenk.',
    exampleTranslation: 'Thank you very much for the beautiful gift.',
    pronunciation: "shurn - Say 'shee' with lips rounded to 'oo'."
  },
  {
    id: 'Interessant',
    word: 'interessant',
    translation: 'interesting',
    difficulty: 'Hard',
    gender: '',
    example: 'Das Buch ist extrem interessant.',
    exampleTranslation: 'The book is extremely interesting.',
    pronunciation: 'in-te-res-SAHNT - Stress on the last syllable.'
  },
  {
    id: 'Natuerlich',
    word: 'natürlich',
    translation: 'natural / of course',
    difficulty: 'Hard',
    gender: '',
    example: 'Natürlich helfe ich dir!',
    exampleTranslation: 'Of course I will help you!',
    pronunciation: 'nah-TEER-likh - Rounded U, lick + ch.'
  },
  {
    id: 'Eigentlich',
    word: 'eigentlich',
    translation: 'actually / really',
    difficulty: 'Hard',
    gender: '',
    example: 'Eigentlich wollte ich gehen.',
    exampleTranslation: 'Actually I wanted to go.',
    pronunciation: 'IGH-gent-likh - Eye-gent-lick-ch.'
  },
  {
    id: 'Vielleicht',
    word: 'vielleicht',
    translation: 'perhaps / maybe',
    difficulty: 'Hard',
    gender: '',
    example: 'Vielleicht kommen wir morgen.',
    exampleTranslation: 'Maybe we will come tomorrow.',
    pronunciation: 'fee-LIGHT - F-sound starting, rhymes with english \"light\".'
  },
  {
    id: 'Trotzdem',
    word: 'trotzdem',
    translation: 'nevertheless / anyway',
    difficulty: 'Hard',
    gender: '',
    example: 'Es regnet, aber wir gehen trotzdem raus.',
    exampleTranslation: 'It\'s raining, but we\'re going out anyway.',
    pronunciation: 'TROTS-dem - Short O, crisp TS-sound + dem.'
  },
  {
    id: 'Obwohl',
    word: 'obwohl',
    translation: 'although',
    difficulty: 'Hard',
    gender: '',
    example: 'Er kam, obwohl er krank war.',
    exampleTranslation: 'He came, although he was sick.',
    pronunciation: 'op-VOHL - P-sound for \"ob\", V-sound + L.'
  },
  {
    id: 'Dennoch',
    word: 'dennoch',
    translation: 'yet / still / nevertheless',
    difficulty: 'Hard',
    gender: '',
    example: 'Sie war müde, und dennoch las sie weiter.',
    exampleTranslation: 'She was tired, and yet she kept reading.',
    pronunciation: 'DEN-nokh - Den + short O + throat ch.'
  },
  {
    id: 'Ausserdem',
    word: 'außerdem',
    translation: 'besides / in addition',
    difficulty: 'Hard',
    gender: '',
    example: 'Außerdem möchte ich Tee trinken.',
    exampleTranslation: 'In addition, I would like to drink tea.',
    pronunciation: 'OW-ser-dem - \"Ow\" in cow + ser-dem.'
  },
  {
    id: 'Allerdings',
    word: 'allerdings',
    translation: 'however / indeed',
    difficulty: 'Hard',
    gender: '',
    example: 'Wir können gehen, allerdings ist es spät.',
    exampleTranslation: 'We can go; however, it is late.',
    pronunciation: 'al-ler-DINGSS - Al + ler + dingss.'
  },
  {
    id: 'Deshalb',
    word: 'deshalb',
    translation: 'therefore / that is why',
    difficulty: 'Hard',
    gender: '',
    example: 'Ich bin krank, deshalb bleibe ich zu Hause.',
    exampleTranslation: 'I am sick, therefore I am staying at home.',
    pronunciation: 'DESS-halp - Dess + hal + crisp P sound.'
  },
  {
    id: 'Deswegen',
    word: 'deswegen',
    translation: 'therefore / because of that',
    difficulty: 'Hard',
    gender: '',
    example: 'Ich hatte viel zu lernen, deswegen kam ich nicht.',
    exampleTranslation: 'I had a lot to study, which is why I didn\'t come.',
    pronunciation: 'DESS-vay-gen - Dess + vay + gen.'
  },
  {
    id: 'Inzwischen',
    word: 'inzwischen',
    translation: 'meanwhile / by now',
    difficulty: 'Hard',
    gender: '',
    example: 'Ich habe inzwischen meine Meinung geändert.',
    exampleTranslation: 'I have meanwhile changed my mind.',
    pronunciation: 'in-TSVISH-en - TS + V-sound + sh + en.'
  },
  {
    id: 'Uebrigens',
    word: 'übrigens',
    translation: 'by the way / incidentally',
    difficulty: 'Hard',
    gender: '',
    example: 'Übrigens, hast du den Schlüssel gefunden?',
    exampleTranslation: 'By the way, did you find the key?',
    pronunciation: 'EW-brik-enss - Rounded U + brik + enss.'
  },
  {
    id: 'Immerhin',
    word: 'immerhin',
    translation: 'after all / at least',
    difficulty: 'Hard',
    gender: '',
    example: 'Immerhin hat es heute nicht geschneit.',
    exampleTranslation: 'At least it did not snow today.',
    pronunciation: 'im-mer-HIN - Rhymes with English \"inner-pin\".'
  },
  {
    id: 'Schliesslich',
    word: 'schließlich',
    translation: 'eventually / finally',
    difficulty: 'Hard',
    gender: '',
    example: 'Schließlich hat er das Rätsel gelöst.',
    exampleTranslation: 'Eventually, he solved the puzzle.',
    pronunciation: 'SHLEESS-likh - Sh + leess + lick-ch.'
  },
  {
    id: 'Zunaechst',
    word: 'zunächst',
    translation: 'initially / first of all',
    difficulty: 'Hard',
    gender: '',
    example: 'Zunächst wollen wir etwas essen.',
    exampleTranslation: 'First of all, we want to eat something.',
    pronunciation: 'tsoo-NAYKHST - TS-sound + naykhst.'
  },
  {
    id: 'Anschliessend',
    word: 'anschließend',
    translation: 'subsequently / afterwards',
    difficulty: 'Hard',
    gender: '',
    example: 'Wir essen zuerst, anschließend spielen wir.',
    exampleTranslation: 'We eat first, afterwards we play.',
    pronunciation: 'AHN-shleess-ent - Open ahn, shleess, ending d as T.'
  },
  {
    id: 'Waehrenddessen',
    word: 'währenddessen',
    translation: 'meanwhile / in the meantime',
    difficulty: 'Hard',
    gender: '',
    example: 'Ich putze, währenddessen kochst du.',
    exampleTranslation: 'I clean, meanwhile you cook.',
    pronunciation: 'VAIR-ent-dess-en - V-sound starting.'
  },
  {
    id: 'Gleichzeitig',
    word: 'gleichzeitig',
    translation: 'simultaneously / at the same time',
    difficulty: 'Hard',
    gender: '',
    example: 'Wir können nicht gleichzeitig sprechen.',
    exampleTranslation: 'We cannot speak simultaneously.',
    pronunciation: 'GLYKH-tsigh-tikh - Glykh + tsigh + tikh.'
  },
  {
    id: 'Entsprechend',
    word: 'entsprechend',
    translation: 'accordingly / corresponding',
    difficulty: 'Hard',
    gender: '',
    example: 'Er handelte entsprechend den Regeln.',
    exampleTranslation: 'He acted according to the rules.',
    pronunciation: 'ent-SHPREKH-ent - Ent + shprekh + ent.'
  },
  {
    id: 'Hinsichtlich',
    word: 'hinsichtlich',
    translation: 'with regard to / regarding',
    difficulty: 'Hard',
    gender: '',
    example: 'Hinsichtlich des Preises sind wir einverstanden.',
    exampleTranslation: 'Regarding the price, we are in agreement.',
    pronunciation: 'HIN-zicht-lich - Hin + zicht + lich.'
  },
  {
    id: 'Bezueglich',
    word: 'bezüglich',
    translation: 'concerning / regarding',
    difficulty: 'Hard',
    gender: '',
    example: 'Ich schreibe bezüglich Ihrer Anfrage.',
    exampleTranslation: 'I am writing regarding your inquiry.',
    pronunciation: 'beh-TSEEG-likh - TS-sound, rounded E, lick-ch.'
  },
  {
    id: 'Gegebenenfalls',
    word: 'gegebenenfalls',
    translation: 'if necessary / potentially',
    difficulty: 'Hard',
    gender: '',
    example: 'Wir werden gegebenenfalls Anpassungen vornehmen.',
    exampleTranslation: 'We will make adjustments if necessary.',
    pronunciation: 'gheh-GAY-ben-en-falls - Literally \"given-case-case\".'
  },
  {
    id: 'Beziehungsweise',
    word: 'beziehungsweise',
    translation: 'or / respectively',
    difficulty: 'Hard',
    gender: '',
    example: 'Er reist mit dem Zug beziehungsweise mit dem Auto.',
    exampleTranslation: 'He travels by train, or respectively, by car.',
    pronunciation: 'beh-TSEE-oongs-vy-zeh - Very common spoken/written shorthand.'
  },
  {
    id: 'Dementsprechend',
    word: 'dementsprechend',
    translation: 'correspondingly / accordingly',
    difficulty: 'Hard',
    gender: '',
    example: 'Es war kalt, dementsprechend zogen wir Jacken an.',
    exampleTranslation: 'It was cold, accordingly we put on jackets.',
    pronunciation: 'deh-MENT-shprekh-ent - De + ment + shprekh + ent.'
  }
];
