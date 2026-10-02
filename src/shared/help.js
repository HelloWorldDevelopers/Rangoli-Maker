/* =====================================================================
   Help: an ⓘ button next to every feature, with a short explanation
   in the current language. Bodies are [English, Hindi, Marathi].
   ===================================================================== */
(() => {
  const H = {
    // ---- Studio panel ----
    selection: ['Edit the shapes you selected. Every repeat of a shape follows your change. Choose whether resize and rotate work around the rangoli centre or around the shape itself.', 'चुने गए आकारों को बदलें। आकार के सारे दोहराव साथ बदलते हैं। आकार बदलना और घुमाना रंगोली के केंद्र पर हो या आकार के अपने केंद्र पर, यह चुनें।', 'निवडलेले आकार बदला. आकाराच्या सगळ्या पुनरावृत्ती सोबत बदलतात. आकार बदलणं आणि फिरवणं रांगोळीच्या मध्याभोवती की आकाराभोवती, ते निवडा.'],
    brushEngine: ['Choose how the brush paints: Brush (smooth), Pencil (thin, grainy), Pen (calligraphy), Marker (flat), Chalk (powder), Spray (dots), Airbrush (soft), Highlighter (see-through) or Custom (a chain of stamps).', 'ब्रश कैसे रंगे यह चुनें: ब्रश (चिकना), पेंसिल (पतली), पेन (सुलेख), मार्कर (चपटा), चॉक (पाउडर), स्प्रे (बिंदु), एयरब्रश (मुलायम), हाइलाइटर (पारदर्शी) या कस्टम (ठप्पों की माला)।', 'ब्रश कसा रंगवेल ते निवडा: ब्रश (गुळगुळीत), पेन्सिल (बारीक), पेन (सुलेखन), मार्कर (चपटा), खडू (पूड), स्प्रे (ठिपके), एअरब्रश (मऊ), हायलायटर (पारदर्शक) किंवा सानुकूल (ठशांची माळ).'],
    customTip: ['The shape the Custom brush repeats along your stroke, like a flower chain.', 'कस्टम ब्रश आपकी रेखा पर कौन-सा आकार दोहराए, जैसे फूलों की माला।', 'सानुकूल ब्रश तुमच्या रेषेवर कोणता आकार पुन्हा पुन्हा काढेल, जसं फुलांची माळ.'],
    size: ['How thick the brush or line is.', 'ब्रश या रेखा कितनी मोटी हो।', 'ब्रश किंवा रेषा किती जाड असावी.'],
    opacity: ['How see-through the paint is. Lower values let layers below show through.', 'रंग कितना पारदर्शी हो। कम करने पर नीचे की चीज़ें दिखती हैं।', 'रंग किती पारदर्शक असावा. कमी केल्यास खालचं दिसतं.'],
    hardness: ['100% gives a crisp edge. Lower values give a soft, blurred edge.', '100% पर किनारा साफ़ रहता है। कम करने पर किनारा मुलायम और धुंधला होता है।', '100% वर कडा स्पष्ट राहतो. कमी केल्यास कडा मऊ आणि धूसर होतो.'],
    spacing: ['Distance between dots or stamps for Chalk, Spray and Custom brushes.', 'चॉक, स्प्रे और कस्टम ब्रश में बिंदुओं या ठप्पों के बीच की दूरी।', 'खडू, स्प्रे आणि सानुकूल ब्रशमधील ठिपक्यांमधलं किंवा ठशांमधलं अंतर.'],
    smoothing: ['Steadies shaky hands by smoothing your stroke as you draw. Higher is smoother.', 'बनाते समय रेखा को चिकना करके हाथ की कंपन कम करता है। ज़्यादा = ज़्यादा चिकना।', 'काढताना रेषा गुळगुळीत करून हात थरथरणं कमी करतं. जास्त = जास्त गुळगुळीत.'],
    pressure: ['With a stylus or pen tablet, pressing harder makes the line thicker. A mouse draws at a steady width.', 'स्टाइलस या पेन टैबलेट से ज़ोर से दबाने पर रेखा मोटी होती है। माउस से मोटाई एक-सी रहती है।', 'स्टायलस किंवा पेन टॅबलेटने जोरात दाबल्यास रेषा जाड होते. माउसने जाडी सारखीच राहते.'],
    presets: ['Ready-made brush settings. Type a name and press Save to keep your own; tap × to remove one you saved.', 'तैयार ब्रश सेटिंग्स। अपनी सेटिंग रखने के लिए नाम लिखकर सहेजें; हटाने के लिए × दबाएँ।', 'तयार ब्रश सेटिंग्ज. स्वतःची सेटिंग ठेवण्यासाठी नाव लिहून जतन करा; काढण्यासाठी × दाबा.'],
    shapeOpts: ['Settings for the shape tools: line, curve, circle, petal, polygon, dot, stamp and fill.', 'आकार औज़ारों की सेटिंग: रेखा, वक्र, वृत्त, पंखुड़ी, बहुभुज, बिंदु, ठप्पा और भराव।', 'आकार साधनांच्या सेटिंग्ज: रेषा, वक्र, वर्तुळ, पाकळी, बहुभुज, ठिपका, ठसा आणि रंग भरणं.'],
    filled: ['On: the shape is filled with colour. Off: only its outline is drawn.', 'चालू: आकार रंग से भरा। बंद: सिर्फ़ किनारे की रेखा।', 'चालू: आकार रंगाने भरलेला. बंद: फक्त कडेची रेषा.'],
    petalWidth: ['How fat the petal is compared with its length.', 'लंबाई की तुलना में पंखुड़ी कितनी चौड़ी हो।', 'लांबीच्या तुलनेत पाकळी किती रुंद असावी.'],
    sides: ['Number of corners for the polygon: 3 is a triangle, 6 a hexagon.', 'बहुभुज के कोने: 3 = त्रिभुज, 6 = षट्भुज।', 'बहुभुजाचे कोपरे: 3 = त्रिकोण, 6 = षटकोन.'],
    bend: ['How much the curve bows. Negative values bend it the other way.', 'वक्र कितना मुड़े। ऋण मान उल्टी तरफ़ मोड़ते हैं।', 'वक्र किती वाकावा. ऋण मूल्य उलट्या बाजूला वाकवतं.'],
    stamp: ['The motif the Stamp tool places: flower, star, leaf, diya, heart, mango or dot. Stamps turn to face outward.', 'ठप्पा औज़ार कौन-सा रूप रखे: फूल, तारा, पत्ता, दीया, दिल, कैरी या बिंदु। ठप्पे बाहर की ओर मुड़ते हैं।', 'ठसा साधन कोणता आकार ठेवेल: फूल, चांदणी, पान, पणती, बदाम, कोयरी किंवा ठिपका. ठसे बाहेरच्या दिशेने वळतात.'],
    stampSize: ['How big each stamp is.', 'हर ठप्पा कितना बड़ा हो।', 'प्रत्येक ठसा किती मोठा असावा.'],
    tolerance: ['How different a colour can be and still get filled. Raise it if the fill leaves gaps.', 'कितना अलग रंग भी भर जाए। भराव में खाली जगह छूटे तो बढ़ाएँ।', 'किती वेगळा रंगही भरला जावा. भरताना जागा सुटत असेल तर वाढवा.'],
    textSec: ['Add words such as “शुभ दीपावली”. Click the canvas to place them. With more than one segment the words repeat around the centre.', '“शुभ दीपावली” जैसे शब्द जोड़ें। रखने के लिए कैनवास पर क्लिक करें। एक से ज़्यादा खंड होने पर शब्द केंद्र के चारों ओर दोहराते हैं।', '“शुभ दीपावली” असे शब्द जोडा. ठेवण्यासाठी कॅनव्हासवर क्लिक करा. एकापेक्षा जास्त खंड असल्यास शब्द मध्याभोवती पुन्हा उमटतात.'],
    font: ['The typeface for your words. Yatra One, Baloo 2 and Hind support Marathi and Hindi.', 'शब्दों का फ़ॉन्ट। Yatra One, Baloo 2 और Hind मराठी और हिंदी लिखते हैं।', 'शब्दांचा फॉन्ट. Yatra One, Baloo 2 आणि Hind मराठी आणि हिंदी लिहितात.'],
    textSize: ['How tall the letters are.', 'अक्षर कितने बड़े हों।', 'अक्षरं किती मोठी असावीत.'],
    colourMgmt: ['Pick colours with the wheel, HEX or RGB. The big chip is the main colour; the small chip is the second colour used by gradients and patterns. Solid, Radial, Linear, Rainbow and Pattern decide how shapes are painted.', 'रंग चक्र, HEX या RGB से रंग चुनें। बड़ा = मुख्य रंग, छोटा = ग्रेडिएंट और पैटर्न का दूसरा रंग। एक रंग, वृत्ताकार, रेखीय, इंद्रधनुष और पैटर्न तय करते हैं कि आकार कैसे रंगे जाएँ।', 'रंगचक्र, HEX किंवा RGB ने रंग निवडा. मोठा = मुख्य रंग, लहान = ग्रेडियंट आणि नमुन्यांसाठी दुसरा रंग. एक रंग, वर्तुळाकार, रेषीय, इंद्रधनुष्य आणि नमुना ठरवतात की आकार कसे रंगवायचे.'],
    patternFill: ['The repeating pattern used when the paint is set to Pattern. It uses both colours.', 'पैटर्न चुनने पर कौन-सा दोहराता नमूना लगे। इसमें दोनों रंग लगते हैं।', 'नमुना निवडल्यावर कोणता पुनरावृत्त नमुना वापरायचा. यात दोन्ही रंग वापरले जातात.'],
    recent: ['Colours you used most recently. Tap one to use it again.', 'हाल में इस्तेमाल किए रंग। फिर से इस्तेमाल के लिए दबाएँ।', 'अलीकडे वापरलेले रंग. पुन्हा वापरण्यासाठी दाबा.'],
    favourites: ['Your own palette. Press + to add the current colour. Shift-click or right-click a colour to remove it.', 'आपकी अपनी रंग-पट्टी। मौजूदा रंग जोड़ने के लिए + दबाएँ। हटाने के लिए Shift-क्लिक या राइट-क्लिक।', 'तुमचा स्वतःचा रंगसंच. सध्याचा रंग जोडण्यासाठी + दाबा. काढण्यासाठी Shift-क्लिक किंवा राइट-क्लिक.'],
    harmony: ['Colours that go well with your main colour: opposite, neighbouring, three-way and a deeper shade.', 'मुख्य रंग के साथ अच्छे लगने वाले रंग: उल्टा, पास वाला, त्रिकोणीय और गहरा शेड।', 'मुख्य रंगासोबत छान दिसणारे रंग: विरुद्ध, शेजारचे, त्रिकोणी आणि गडद छटा.'],
    recolour: ['Changes every shape painted in the second colour to the main colour, on this layer or all layers. Good for making colour variations of one design.', 'दूसरे रंग वाले सभी आकार मुख्य रंग में बदलता है, इस परत में या सभी परतों में। एक डिज़ाइन के कई रंग-रूप बनाने के लिए अच्छा।', 'दुसऱ्या रंगातले सगळे आकार मुख्य रंगात बदलतं, या स्तरावर किंवा सगळ्या स्तरांवर. एकाच नक्षीचे वेगवेगळे रंग बनवण्यासाठी उपयोगी.'],
    refSec: ['Load a photo of a rangoli or sketch, place it under your drawing and trace over it. It is only a guide and never appears in exports.', 'रंगोली या स्केच की फ़ोटो लोड करें, उसे ड्रॉइंग के नीचे रखें और ऊपर से बनाएँ। यह सिर्फ़ मदद के लिए है, एक्सपोर्ट में नहीं आती।', 'रांगोळीचा किंवा स्केचचा फोटो लोड करा, चित्राखाली ठेवा आणि वरून गिरवा. तो फक्त मदतीसाठी आहे, निर्यातीत येत नाही.'],
    refScale: ['Make the reference photo bigger or smaller.', 'संदर्भ फ़ोटो को बड़ा या छोटा करें।', 'संदर्भ फोटो मोठा किंवा लहान करा.'],
    effects: ['Add finishing touches to new shapes. Turn an effect on before drawing.', 'नए आकारों में सजावट जोड़ें। बनाने से पहले प्रभाव चालू करें।', 'नवीन आकारांना सजावट द्या. काढण्याआधी परिणाम चालू करा.'],
    fxGlow: ['A soft glow around the shape in its own colour, like a lit diya.', 'आकार के चारों ओर उसी रंग की हल्की चमक, जलते दीये जैसी।', 'आकाराभोवती त्याच रंगाचं मंद तेज, पेटत्या पणतीसारखं.'],
    fxGlitter: ['Sparkling white and gold specks, like glitter powder.', 'चमकते सफ़ेद और सुनहरे कण, ग्लिटर पाउडर जैसे।', 'चमकणारे पांढरे आणि सोनेरी कण, चमकी पुडीसारखे.'],
    fxShadow: ['A drop shadow that lifts the shape off the floor.', 'नीचे पड़ती छाया जिससे आकार उभरा हुआ दिखे।', 'खाली पडणारी सावली, ज्यामुळे आकार उठावदार दिसतो.'],
    fxMetal: ['A shiny metallic sheen, like gold or silver foil.', 'सोने या चाँदी के वर्क जैसी धात्विक चमक।', 'सोन्याच्या किंवा चांदीच्या वर्खासारखी धातूची चमक.'],
    fxTex: ['A grainy powder texture on filled shapes, like real rangoli colours.', 'भरे आकारों पर पाउडर जैसी दानेदार बनावट, असली रंगोली के रंगों जैसी।', 'भरलेल्या आकारांवर पुडीसारखा दाणेदार पोत, खऱ्या रांगोळीसारखा.'],
    symmetry: ['How your drawing repeats. Radial repeats around the centre, Repeat grid tiles it across the canvas, Border repeats it along the four edges.', 'आपकी ड्रॉइंग कैसे दोहराए। वृत्ताकार = केंद्र के चारों ओर, ग्रिड = पूरे कैनवास पर टाइल, किनारी = चारों किनारों पर।', 'तुमचं चित्र कसं पुन्हा उमटेल. वर्तुळाकार = मध्याभोवती, जाळी = संपूर्ण कॅनव्हासवर टाइल, किनार = चारही कडांवर.'],
    segments: ['How many times each stroke repeats around the centre. 8 or 12 suit most rangoli.', 'हर रेखा केंद्र के चारों ओर कितनी बार दोहराए। ज़्यादातर रंगोली के लिए 8 या 12 अच्छे हैं।', 'प्रत्येक रेषा मध्याभोवती किती वेळा उमटेल. बहुतेक रांगोळ्यांसाठी 8 किंवा 12 योग्य.'],
    rotation: ['Turns the whole repeat pattern by this angle, so new shapes sit between existing ones.', 'पूरे दोहराव को इस कोण से घुमाता है ताकि नए आकार पुरानों के बीच आएँ।', 'संपूर्ण पुनरावृत्ती या कोनाने फिरवतं, म्हणजे नवे आकार जुन्यांच्या मधोमध येतात.'],
    mirrorP: ['Also draws a mirror image in every segment, like folding paper to cut a pattern.', 'हर खंड में दर्पण-छवि भी बनाता है, जैसे कागज़ मोड़कर नक्शा काटना।', 'प्रत्येक खंडात आरशातलं प्रतिबिंबही काढतं, कागद दुमडून नक्षी कापल्यासारखं.'],
    repeatsK: ['For Repeat grid and Border: how many copies fit across each side.', 'ग्रिड और किनारी के लिए: हर तरफ़ कितनी प्रतियाँ आएँ।', 'जाळी आणि किनारीसाठी: प्रत्येक बाजूला किती प्रती बसतील.'],
    motifRing: ['Adds a complete ring of petals, dots, scallops, diamonds, leaves, flowers or a filled centre in one click, using the current colour and segments.', 'एक क्लिक में पंखुड़ियों, बिंदुओं, अर्धवृत्तों, हीरों, पत्तियों, फूलों का पूरा वलय या भरा केंद्र जोड़ता है, मौजूदा रंग और खंडों से।', 'एका क्लिकमध्ये पाकळ्या, ठिपके, अर्धवर्तुळं, चौकोन, पानं, फुलं यांचं पूर्ण वर्तुळ किंवा भरलेला मध्य जोडतं, सध्याचा रंग आणि खंड वापरून.'],
    radius: ['How far from the centre the ring sits.', 'वलय केंद्र से कितनी दूर हो।', 'वर्तुळ मध्यापासून किती दूर असावं.'],
    guides: ['Helper lines that are never exported. Snap pulls shapes onto the guides for exact placement.', 'मदद की रेखाएँ जो एक्सपोर्ट नहीं होतीं। स्नैप आकारों को सटीक जगह पर गाइड से जोड़ता है।', 'मदतीच्या रेषा ज्या निर्यात होत नाहीत. स्नॅप आकारांना अचूक जागी मार्गदर्शकांवर बसवतं.'],
    kolamGrid: ['A grid of dots like a traditional kolam or ठिपक्यांची रांगोळी. With Snap on, shapes land exactly on the dots.', 'पारंपरिक कोलम जैसा बिंदुओं का ग्रिड। स्नैप चालू हो तो आकार ठीक बिंदुओं पर आते हैं।', 'पारंपरिक ठिपक्यांच्या रांगोळीसारखी ठिपक्यांची जाळी. स्नॅप चालू असल्यास आकार नेमके ठिपक्यांवर बसतात.'],
    snap: ['Pulls points onto the segment lines, rings or dots so lines meet precisely. Shortcut: S.', 'बिंदुओं को खंड रेखाओं, वलयों या बिंदुओं पर खींचता है ताकि रेखाएँ ठीक मिलें। शॉर्टकट: S।', 'बिंदू खंड रेषा, वर्तुळं किंवा ठिपक्यांवर ओढतं, म्हणजे रेषा अचूक जुळतात. शॉर्टकट: S.'],
    layers: ['Stack parts of your design separately. The eye hides a layer, the lock stops changes, double-click renames. Merge down joins a layer into the one below.', 'डिज़ाइन के हिस्सों को अलग परतों में रखें। आँख = छिपाना, ताला = बदलाव रोकना, डबल-क्लिक = नाम बदलना। नीचे मिलाएँ = नीचे वाली परत में जोड़ना।', 'नक्षीचे भाग वेगवेगळ्या स्तरांवर ठेवा. डोळा = लपवणं, कुलूप = बदल थांबवणं, डबल-क्लिक = नाव बदलणं. खाली विलीन = खालच्या स्तरात जोडणं.'],
    blendMode: ['How a layer mixes with the layers below. Multiply darkens, Screen lightens, Overlay adds contrast.', 'परत नीचे वाली परतों से कैसे मिले। मल्टीप्लाई गहरा, स्क्रीन हल्का, ओवरले कंट्रास्ट बढ़ाता है।', 'स्तर खालच्या स्तरांमध्ये कसा मिसळेल. गुणाकार गडद करतो, स्क्रीन फिकट करतो, आच्छादन कॉन्ट्रास्ट वाढवतो.'],
    layerOpacity: ['How see-through the whole layer is.', 'पूरी परत कितनी पारदर्शी हो।', 'संपूर्ण स्तर किती पारदर्शक असावा.'],
    history: ['Every change you made, newest first. Click a step to go back to it; Redo brings changes back.', 'आपके सभी बदलाव, नए सबसे ऊपर। किसी कदम पर वापस जाने के लिए क्लिक करें; फिर करें से बदलाव लौटते हैं।', 'तुम्ही केलेले सगळे बदल, नवीन वर. त्या टप्प्यावर परत जाण्यासाठी क्लिक करा; पुन्हा करा ने बदल परत येतात.'],
    canvasShape: ['∞ Infinite gives an endless board like draw.io: wheel or Pan tool to move, Ctrl + wheel or pinch to zoom, Fit (0) frames your drawing, and exports crop to what you drew. The other options are fixed canvas proportions.', '∞ अनंत = draw.io जैसा अंतहीन बोर्ड: व्हील/पैन से खिसकाएँ, Ctrl + व्हील या पिंच से ज़ूम, फ़िट (0) चित्र दिखाता है, एक्सपोर्ट चित्र तक कटता है। बाकी विकल्प तय अनुपात हैं।', '∞ अमर्याद = draw.io सारखा अंतहीन बोर्ड: व्हील/पॅनने सरकवा, Ctrl + व्हील किंवा पिंचने झूम, बसवा (0) चित्र दाखवते, निर्यात चित्रापुरती कापली जाते. बाकी पर्याय ठराविक प्रमाण आहेत.'],
    background: ['The floor colour behind your rangoli.', 'रंगोली के पीछे ज़मीन का रंग।', 'रांगोळीमागच्या जमिनीचा रंग.'],
    floorTex: ['Adds a subtle grain to the background, like a real floor.', 'पृष्ठभूमि में हल्की बनावट, असली ज़मीन जैसी।', 'पार्श्वभूमीला हलका पोत, खऱ्या जमिनीसारखा.'],
    // ---- Kids ----
    k_colours: ['Tap a colour pot to paint with it. The rainbow pot gives every repeat a different colour.', 'रंग का डिब्बा दबाओ और उस रंग से बनाओ। इंद्रधनुष वाला डिब्बा हर दोहराव को अलग रंग देता है।', 'रंगाचा डबा दाबा आणि त्या रंगाने काढा. इंद्रधनुष्याचा डबा प्रत्येक पुनरावृत्तीला वेगळा रंग देतो.'],
    k_tools: ['Brush paints, Pencil draws thin lines, Fill pours colour inside a shape, Stickers add flowers and diyas, Patterns paint glitter, powder and flower chains, Eraser rubs out.', 'ब्रश रंगता है, पेंसिल पतली रेखा बनाती है, भराव आकार में रंग भरता है, स्टिकर फूल और दीये लगाते हैं, पैटर्न चमकी, पाउडर और फूलों की माला बनाते हैं, रबर मिटाता है।', 'ब्रश रंगवतो, पेन्सिल बारीक रेषा काढते, भरणं आकारात रंग भरतं, स्टिकर फुलं आणि पणत्या लावतात, नक्षी चमकी, पूड आणि फुलांची माळ काढतात, खोडरबर पुसतो.'],
    k_stickers: ['Pick a sticker, then tap the canvas. It appears all around the middle.', 'स्टिकर चुनो, फिर कैनवास पर दबाओ। वह बीच के चारों ओर आ जाएगा।', 'स्टिकर निवडा, मग कॅनव्हासवर दाबा. तो मध्याभोवती सगळीकडे उमटेल.'],
    k_patterns: ['Special brushes: glitter, powder like real rangoli, confetti dots, flower chain, star chain and dotted line.', 'ख़ास ब्रश: चमकी, असली रंगोली जैसा पाउडर, रंगीन बिंदु, फूलों की माला, तारों की माला और बिंदीदार रेखा।', 'खास ब्रश: चमकी, खऱ्या रांगोळीसारखी पूड, रंगीत ठिपके, फुलांची माळ, चांदण्यांची माळ आणि ठिपक्यांची रेषा.'],
    k_size: ['Choose small, medium or big lines and stickers.', 'छोटी, मध्यम या बड़ी रेखाएँ और स्टिकर चुनो।', 'लहान, मध्यम किंवा मोठ्या रेषा आणि स्टिकर निवडा.'],
    k_repeats: ['How many times your drawing repeats around the middle. Mirror also makes a reflection; Dot guide shows dots to follow.', 'आपकी ड्रॉइंग बीच के चारों ओर कितनी बार दोहराए। दर्पण उल्टी छवि भी बनाता है; बिंदु मदद पालन के लिए बिंदु दिखाती है।', 'तुमचं चित्र मध्याभोवती किती वेळा उमटेल. आरसा प्रतिबिंबही काढतो; ठिपके मदतीसाठी ठिपके दाखवतात.'],
    k_canvas: ['Square, Wide, or Fit screen to use all the space your device has.', 'चौकोर, चौड़ा, या पूरी स्क्रीन ताकि डिवाइस की पूरी जगह इस्तेमाल हो।', 'चौरस, रुंद, किंवा पूर्ण स्क्रीन म्हणजे डिव्हाइसची सगळी जागा वापरली जाईल.'],
    k_floor: ['The colour of the floor under your rangoli.', 'रंगोली के नीचे ज़मीन का रंग।', 'रांगोळीखालच्या जमिनीचा रंग.'],
    k_actions: ['Undo takes back the last step, Clear wipes everything, Surprise me makes a new rangoli, Save picture keeps it as a picture, print page or video.', 'वापस = पिछला कदम हटाओ, मिटाओ = सब साफ़, सरप्राइज़ = नई रंगोली, चित्र सहेजो = चित्र, प्रिंट पेज या वीडियो के रूप में रखो।', 'मागे = मागचा टप्पा रद्द, पुसा = सगळं साफ, सरप्राईज = नवी रांगोळी, चित्र जतन कर = चित्र, छपाईचं पान किंवा व्हिडिओ म्हणून ठेवा.'],
    k_designs: ['Pick a design, choose a colour pot, then tap each shape to fill it. Start over clears the colours.', 'डिज़ाइन चुनो, रंग चुनो, फिर हर आकार पर दबाकर रंग भरो। फिर से शुरू रंग हटाता है।', 'नक्षी निवडा, रंग निवडा, मग प्रत्येक आकारावर दाबून रंग भरा. पुन्हा सुरू रंग काढतं.']
  };
  // Studio tools and top bar, used by the guide and by the tool-rail tooltips
  const TOOL_HELP = {
    select: ['Click a shape to select it, drag to move it, or drag a box on empty space to select many.', 'आकार चुनने के लिए क्लिक करें, खिसकाने के लिए खींचें, या खाली जगह पर बॉक्स बनाकर कई चुनें।', 'आकार निवडण्यासाठी क्लिक करा, हलवण्यासाठी ओढा, किंवा रिकाम्या जागी चौकट ओढून अनेक निवडा.'],
    brush: ['Paint freehand strokes with the brush engine.', 'ब्रश इंजन से हाथ से रेखाएँ बनाएँ।', 'ब्रश इंजिनने हाताने रेषा काढा.'],
    eraser: ['Rub out parts of the active layer. Every repeat is erased together.', 'सक्रिय परत के हिस्से मिटाएँ। सारे दोहराव साथ मिटते हैं।', 'सक्रिय स्तराचे भाग पुसा. सगळ्या पुनरावृत्ती सोबत पुसल्या जातात.'],
    fill: ['Pour colour inside a closed shape, in every repeat at once.', 'बंद आकार में रंग भरें, सारे दोहराव में एक साथ।', 'बंद आकारात रंग भरा, सगळ्या पुनरावृत्तींमध्ये एकाच वेळी.'],
    eyedrop: ['Click the canvas to pick that colour, then return to your previous tool.', 'उस रंग को उठाने के लिए कैनवास पर क्लिक करें, फिर पिछले औज़ार पर लौटें।', 'तो रंग उचलण्यासाठी कॅनव्हासवर क्लिक करा, मग आधीच्या साधनावर परत.'],
    line: ['Drag to draw a straight line.', 'सीधी रेखा के लिए खींचें।', 'सरळ रेषेसाठी ओढा.'],
    curve: ['Drag to draw a curved line. Set the bend in Shape options.', 'वक्र रेखा के लिए खींचें। मोड़ आकार विकल्प में बदलें।', 'वक्र रेषेसाठी ओढा. बाक आकार पर्यायांत बदला.'],
    circle: ['Drag from the centre outward to draw a circle.', 'वृत्त के लिए केंद्र से बाहर की ओर खींचें।', 'वर्तुळासाठी मध्यापासून बाहेर ओढा.'],
    petal: ['Drag from base to tip to draw a petal.', 'पंखुड़ी के लिए आधार से नोक तक खींचें।', 'पाकळीसाठी तळापासून टोकापर्यंत ओढा.'],
    poly: ['Drag to draw a polygon. Set the number of sides in Shape options.', 'बहुभुज के लिए खींचें। भुजाएँ आकार विकल्प में।', 'बहुभुजासाठी ओढा. बाजू आकार पर्यायांत.'],
    dot: ['Click to place dots.', 'बिंदु रखने के लिए क्लिक करें।', 'ठिपके ठेवण्यासाठी क्लिक करा.'],
    stamp: ['Click to place a motif such as a flower, diya or mango.', 'फूल, दीया या कैरी जैसा रूप रखने के लिए क्लिक करें।', 'फूल, पणती किंवा कोयरीसारखा आकार ठेवण्यासाठी क्लिक करा.'],
    text: ['Click to place words such as a festival greeting.', 'त्योहार की शुभकामना जैसे शब्द रखने के लिए क्लिक करें।', 'सणाच्या शुभेच्छांसारखे शब्द ठेवण्यासाठी क्लिक करा.'],
    centre: ['Click to set where the next designs are centred. On the infinite board you can build many rangolis side by side, each with its own symmetry centre (orange cross).', 'अगले डिज़ाइन का केंद्र चुनने के लिए क्लिक करें। अनंत बोर्ड पर कई रंगोलियाँ अगल-बगल बनाएँ, हर एक का अपना केंद्र (नारंगी क्रॉस)।', 'पुढच्या डिझाइनचं केंद्र ठरवण्यासाठी क्लिक करा. अमर्याद बोर्डवर अनेक रांगोळ्या शेजारी शेजारी काढा, प्रत्येकीचं स्वतःचं केंद्र (नारिंगी क्रॉस).'],
    pan: ['Drag to move around the canvas. You can also hold Space and drag.', 'कैनवास पर घूमने के लिए खींचें। स्पेस दबाकर भी खींच सकते हैं।', 'कॅनव्हासवर फिरण्यासाठी ओढा. स्पेस दाबूनही ओढू शकता.']
  };
  const BAR_HELP = [
    ['myDesigns', ['All your saved designs with thumbnails. Open, rename, duplicate or delete them.', 'सहेजे गए सभी डिज़ाइन, छोटी तस्वीरों के साथ। खोलें, नाम बदलें, कॉपी करें या हटाएँ।', 'जतन केलेल्या सगळ्या नक्षी, छोट्या चित्रांसह. उघडा, नाव बदला, प्रत करा किंवा काढा.']],
    ['new', ['Start a new design from a blank canvas or one of 20 templates.', 'खाली कैनवास या 20 टेम्पलेट में से किसी से नया डिज़ाइन शुरू करें।', 'रिकाम्या कॅनव्हासवरून किंवा 20 साच्यांपैकी एकावरून नवीन नक्षी सुरू करा.']],
    ['open', ['Open a project file (.json) you saved before.', 'पहले सहेजी प्रोजेक्ट फ़ाइल (.json) खोलें।', 'आधी जतन केलेली प्रोजेक्ट फाइल (.json) उघडा.']],
    ['saveProj', ['Download the design as a project file to back it up or continue on another device.', 'बैकअप या दूसरे डिवाइस पर काम के लिए डिज़ाइन को प्रोजेक्ट फ़ाइल के रूप में डाउनलोड करें।', 'बॅकअपसाठी किंवा दुसऱ्या डिव्हाइसवर काम करण्यासाठी नक्षी प्रोजेक्ट फाइल म्हणून डाउनलोड करा.']],
    ['undoK', ['Undo and redo your last changes.', 'पिछले बदलाव पूर्ववत करें या फिर करें।', 'शेवटचे बदल पूर्ववत करा किंवा पुन्हा करा.']],
    ['fit', ['Zoom in and out, or fit the whole canvas on screen. Pinch with two fingers on a tablet.', 'ज़ूम करें या पूरा कैनवास स्क्रीन पर फ़िट करें। टैबलेट पर दो उँगलियों से पिंच करें।', 'झूम करा किंवा संपूर्ण कॅनव्हास स्क्रीनवर बसवा. टॅबलेटवर दोन बोटांनी पिंच करा.']],
    ['export', ['Save as PNG, JPG, WEBP, SVG, PDF, video or a stencil. Shortcut: Ctrl+E.', 'PNG, JPG, WEBP, SVG, PDF, वीडियो या स्टेंसिल के रूप में सहेजें। शॉर्टकट: Ctrl+E।', 'PNG, JPG, WEBP, SVG, PDF, व्हिडिओ किंवा स्टेन्सिल म्हणून जतन करा. शॉर्टकट: Ctrl+E.']],
    ['fullscreen', ['Use the whole screen for drawing.', 'ड्रॉइंग के लिए पूरी स्क्रीन इस्तेमाल करें।', 'चित्रासाठी संपूर्ण स्क्रीन वापरा.']],
    ['panel', ['Hide or show the settings panel to give the canvas more room. Shortcut: \\.', 'कैनवास को ज़्यादा जगह देने के लिए सेटिंग्स पैनल छिपाएँ या दिखाएँ। शॉर्टकट: \\।', 'कॅनव्हासला जास्त जागा देण्यासाठी सेटिंग्ज पॅनल लपवा किंवा दाखवा. शॉर्टकट: \\.']]
  ];
  RM.addStrings({
    aboutThis: ['About this', 'इसके बारे में', 'याबद्दल'], guideTitle: ['Rangoli Studio guide', 'रंगोली स्टूडियो गाइड', 'रांगोळी स्टुडिओ मार्गदर्शक'],
    guideTools: ['Tools', 'औज़ार', 'साधनं'], guideBar: ['Top bar', 'ऊपर की पट्टी', 'वरची पट्टी'], guideKeys: ['Keyboard shortcuts', 'कीबोर्ड शॉर्टकट', 'कीबोर्ड शॉर्टकट'],
    guideTip: ['Every setting in the right panel has an ⓘ button with more detail.', 'दाएँ पैनल की हर सेटिंग के पास अधिक जानकारी के लिए ⓘ बटन है।', 'उजव्या पॅनलमधील प्रत्येक सेटिंगजवळ अधिक माहितीसाठी ⓘ बटण आहे.']
  });
  const LI = { en: 0, hi: 1, mr: 2 };
  const pickLang = arr => arr[LI[RM.lang]] || arr[0];
  RM.helpText = key => (H[key] ? pickLang(H[key]) : '');
  RM.toolHelp = key => (TOOL_HELP[key] ? pickLang(TOOL_HELP[key]) : '');
  RM.barHelp = () => BAR_HELP.map(([k, v]) => [k, pickLang(v)]);

  let pop = null, popFor = null;
  function closePop() { if (pop) { pop.remove(); pop = null; popFor = null; } }
  function showPop(btn, key, title) {
    if (popFor === btn) { closePop(); return; }
    closePop();
    pop = document.createElement('div');
    pop.className = 'rm-help-pop' + (btn.closest('#view-kids') ? ' kids' : '');
    pop.setAttribute('role', 'dialog');
    pop.innerHTML = '<b></b><p></p><button type="button" class="x" aria-label="Close">×</button>';
    pop.querySelector('b').textContent = title;
    pop.querySelector('p').textContent = RM.helpText(key);
    pop.querySelector('.x').onclick = closePop;
    document.body.appendChild(pop);
    popFor = btn;
    const r = btn.getBoundingClientRect(), w = Math.min(300, innerWidth - 24);
    pop.style.width = w + 'px';
    const left = Math.max(12, Math.min(innerWidth - w - 12, r.left + r.width / 2 - w / 2));
    const below = r.bottom + 8, ph = pop.offsetHeight || 120;
    pop.style.left = left + 'px';
    pop.style.top = (below + ph > innerHeight - 8 ? Math.max(8, r.top - ph - 8) : below) + 'px';
    pop.querySelector('.x').focus();
  }
  document.addEventListener('pointerdown', e => { if (pop && !pop.contains(e.target) && !e.target.closest('.rm-hi')) closePop(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePop(); });
  addEventListener('resize', closePop);

  // map: [element or selector, help key]. The ⓘ goes at the end of the element; its click never toggles the control.
  RM.attachHelp = (root, map) => {
    map.forEach(([target, key, titleKey]) => {
      const el = typeof target === 'string' ? root.querySelector(target) : target;
      if (!el || !H[key] || el.querySelector(':scope > .rm-hi')) return;
      // translations rewrite textContent of [data-t] elements; keep the label text in its own span so the ⓘ survives
      if (el.dataset.t) { const s = document.createElement('span'); s.dataset.t = el.dataset.t; s.textContent = el.textContent; el.textContent = ''; delete el.dataset.t; el.appendChild(s); }
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'rm-hi'; b.textContent = 'i';
      b.dataset.tLabel = 'aboutThis'; b.setAttribute('aria-label', RM.t('aboutThis'));
      b.addEventListener('click', e => {
        e.preventDefault(); e.stopPropagation();
        const title = titleKey ? RM.t(titleKey) : [...el.childNodes].filter(n => !(n.classList && (n.classList.contains('rm-hi') || n.classList.contains('tr') || n.tagName === 'BUTTON' || n.tagName === 'SELECT')) && n.tagName !== 'INPUT').map(n => n.textContent).join(' ').replace(/\s+/g, ' ').trim();
        showPop(b, key, title || RM.t('aboutThis'));
      });
      el.appendChild(b);
    });
  };
  RM.closeHelp = closePop;
})();
