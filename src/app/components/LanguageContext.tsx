'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr' | 'zh' | 'de';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    translations: Record<string, Record<string, string>>;
}


export const translations: Record<Language, Record<string, string>> = {
    en: {
        "title": "Mold Identification Tool",
        "disclaimer": "This tool is just a way for you to narrow down/figure out what potential causes of mold can be. DO NOT make any decisions solely off of this tool. As always, double check the results you receive here and make sure they are correct.",

        "errorLoading": "Error loading quiz. The node could not be found.",
            "restartQuiz": "Restart Quiz",
            "startOver": "Start Over",

            // Questions
            "Do you think you have mold?": "Do you think you have mold?",
            "What is the approximate color?": "What is the approximate color?",
            "Is it flat, powdery, and relatively easy to wipe away?": "Is it flat, powdery, and relatively easy to wipe away?",
            "Is it slimy, wet, dark black, or greenish-black?": "Is it slimy, wet, dark black, or greenish-black?",
            "Is it powdery, often yellow-green or black?": "Is it powdery, often yellow-green or black?",
            "Select the best color description:": "Select the best color description:",
            "Where is the mold located primarily?": "Where is the mold located primarily?",
            "Select the general location:": "Select the general location:",
            "Is the mold growing on food?": "Is the mold growing on food?",

            // Options
            "Yes": "Yes",
            "No": "No",
            "Check the database": "Check the database",
            "Yellow / Gray": "Yellow / Gray",
            "Other (Black, Green, Brown, Pink, etc.)": "Other (Black, Green, Brown, Pink, etc.)",
            "Green / Blue-Green": "Green / Blue-Green",
            "Brown / Olive / Dark": "Brown / Olive / Dark",
            "Pink / White / Reddish": "Pink / White / Reddish",
            "Other / Unsure": "Other / Unsure",
            "Bathroom (Tiles, Shower, Sink area)": "Bathroom (Tiles, Shower, Sink area)",
            "Kitchen (Behind fridge, Under sink)": "Kitchen (Behind fridge, Under sink)",
            "None of the above / Somewhere else": "None of the above / Somewhere else",
            "Basement / Crawl space": "Basement / Crawl space",
            "HVAC / Air vent": "HVAC / Air vent",
            "Carpet or Drywall (visibly water damaged)": "Carpet or Drywall (visibly water damaged)",
            "Other Location": "Other Location",

            // Results text
            "Prevention Tips": "Prevention Tips",
            "Mold can impact your health and can make the environment you live in get worse for everyone involved. To make sure you do not get mold, get a dehumidifier and set it to 50%. Keep windows open and air flowing. Generally, mold grows due to water in the air; by using a dehumidifier, you can remove that water. Also, regular cleaning (especially with vinegar) helps.": "Mold can impact your health and can make the environment you live in get worse for everyone involved. To make sure you do not get mold, get a dehumidifier and set it to 50%. Keep windows open and air flowing. Generally, mold grows due to water in the air; by using a dehumidifier, you can remove that water. Also, regular cleaning (especially with vinegar) helps.",

            "Mildew is fungi that looks flat and powdery. Just clean it off and you should be fine; otherwise it can spread and become more problematic.": "Mildew is fungi that looks flat and powdery. Just clean it off and you should be fine; otherwise it can spread and become more problematic.",

            "The most common type is Stachybotrys chartarum (dark green/black) caused by water damage. Use common household cleaners like bleach, hydrogen peroxide, baking soda, or vinegar to clean small areas. For larger ones, consult a professional.": "The most common type is Stachybotrys chartarum (dark green/black) caused by water damage. Use common household cleaners like bleach, hydrogen peroxide, baking soda, or vinegar to clean small areas. For larger ones, consult a professional.",

            "Powdery mold, often yellow-green or black, growing on various surfaces. Clean smaller areas (non-porous) using bleach (1 cup to 1 gallon of water) or vinegar or 3% hydrogen peroxide in well-ventilated areas. For large or porous areas (drywall, carpet), consult a professional.": "Powdery mold, often yellow-green or black, growing on various surfaces. Clean smaller areas (non-porous) using bleach (1 cup to 1 gallon of water) or vinegar or 3% hydrogen peroxide in well-ventilated areas. For large or porous areas (drywall, carpet), consult a professional.",

            "Often blue-green with a velvety texture; common on water-damaged materials and food. For small non-porous areas, clean with soap and water, then disinfect with bleach (1 cup/gallon) or vinegar/peroxide. For porous materials (drywall, carpet) or large areas, consult a professional. Address the root cause (like leaks), use dehumidifiers and good ventilation.": "Often blue-green with a velvety texture; common on water-damaged materials and food. For small non-porous areas, clean with soap and water, then disinfect with bleach (1 cup/gallon) or vinegar/peroxide. For porous materials (drywall, carpet) or large areas, consult a professional. Address the root cause (like leaks), use dehumidifiers and good ventilation.",

            "Can appear as dark green, brown, or black patches on soil, decaying plants, wood, wallpaper, or carpet. Improve ventilation, control humidity, and use cleaners designed for mold. For big problems, consult professionals.": "Can appear as dark green, brown, or black patches on soil, decaying plants, wood, wallpaper, or carpet. Improve ventilation, control humidity, and use cleaners designed for mold. For big problems, consult professionals.",

            "Often pink, reddish, or white, grows on water-damaged carpets, drywall, and food. Similar cleaning instructions to penicillium. Discard any affected food. For large or porous areas, consult professionals. Always fix the underlying moisture source.": "Often pink, reddish, or white, grows on water-damaged carpets, drywall, and food. Similar cleaning instructions to penicillium. Discard any affected food. For large or porous areas, consult professionals. Always fix the underlying moisture source.",

            "Bathroom mold is common due to moisture. Clean with bathroom products and then a bleach solution (1 cup/gallon) or vinegar. Keep the bathroom well-ventilated and check for leaks.": "Bathroom mold is common due to moisture. Clean with bathroom products and then a bleach solution (1 cup/gallon) or vinegar. Keep the bathroom well-ventilated and check for leaks.",

            "Mold behind fridges or under sinks often relates to condensation or leaks. Clean thoroughly, fix leaks, ensure appliances work properly.": "Mold behind fridges or under sinks often relates to condensation or leaks. Clean thoroughly, fix leaks, ensure appliances work properly.",

            "Basements/crawl spaces are prone to dampness. Could be Stachybotrys or Cladosporium. Fix moisture sources, improve ventilation, consider a dehumidifier. For big areas, consult professionals.": "Basements/crawl spaces are prone to dampness. Could be Stachybotrys or Cladosporium. Fix moisture sources, improve ventilation, consider a dehumidifier. For big areas, consult professionals.",

            "Mold in HVAC systems can spread spores. Do NOT run HVAC if you suspect mold. Professional inspection/cleaning highly recommended. Change filters regularly.": "Mold in HVAC systems can spread spores. Do NOT run HVAC if you suspect mold. Professional inspection/cleaning highly recommended. Change filters regularly.",

            "Water-damaged carpet or drywall is prime for molds like Fusarium or Stachybotrys. Wet carpet/drywall often need removal. Address water sources. Professional remediation recommended.": "Water-damaged carpet or drywall is prime for molds like Fusarium or Stachybotrys. Wet carpet/drywall often need removal. Address water sources. Professional remediation recommended.",

            "Common food spoilage molds. Discard affected food. Don't scrape mold off soft foods. Clean the storage area thoroughly.": "Common food spoilage molds. Discard affected food. Don't scrape mold off soft foods. Clean the storage area thoroughly.",

            "It's difficult to pinpoint the exact type or conditions. For accuracy, especially in larger areas or if health concerns exist, consult a professional.": "It's difficult to pinpoint the exact type or conditions. For accuracy, especially in larger areas or if health concerns exist, consult a professional."

    },

        es: {

            "title": "Herramienta de Identificación de Moho",
            "disclaimer": "Esta herramienta es solo una forma de ayudarte a identificar posibles causas del moho. NO tomes decisiones únicamente con base en esta herramienta. Siempre verifica los resultados que recibes aquí para asegurarte de que sean correctos.",

            // General UI
            "errorLoading": "Error al cargar el cuestionario. No se pudo encontrar el nodo.",
            "restartQuiz": "Reiniciar Cuestionario",
            "startOver": "Comenzar de Nuevo",

            // Questions
            "Do you think you have mold?": "¿Crees que tienes moho?",
            "What is the approximate color?": "¿Cuál es el color aproximado?",
            "Is it flat, powdery, and relatively easy to wipe away?": "¿Es plano, polvoriento y relativamente fácil de limpiar?",
            "Is it slimy, wet, dark black, or greenish-black?": "¿Es viscoso, húmedo, negro oscuro o verde-negro?",
            "Is it powdery, often yellow-green or black?": "¿Es polvoriento, a menudo amarillo-verde o negro?",
            "Select the best color description:": "Selecciona la mejor descripción de color:",
            "Where is the mold located primarily?": "¿Dónde se encuentra principalmente el moho?",
            "Select the general location:": "Selecciona la ubicación general:",
            "Is the mold growing on food?": "¿Está creciendo el moho en alimentos?",

            // Options
            "Yes": "Sí",
            "No": "No",
            "Check the database": "Consultar la base de datos",
            "Yellow / Gray": "Amarillo / Gris",
            "Other (Black, Green, Brown, Pink, etc.)": "Otro (Negro, Verde, Marrón, Rosa, etc.)",
            "Green / Blue-Green": "Verde / Azul-Verde",
            "Brown / Olive / Dark": "Marrón / Oliva / Oscuro",
            "Pink / White / Reddish": "Rosa / Blanco / Rojizo",
            "Other / Unsure": "Otro / No estoy seguro",
            "Bathroom (Tiles, Shower, Sink area)": "Baño (Azulejos, Ducha, Área del lavabo)",
            "Kitchen (Behind fridge, Under sink)": "Cocina (Detrás del refrigerador, Debajo del fregadero)",
            "None of the above / Somewhere else": "Ninguna de las anteriores / En otro lugar",
            "Basement / Crawl space": "Sótano / Espacio de arrastre",
            "HVAC / Air vent": "Sistema HVAC / Conducto de aire",
            "Carpet or Drywall (visibly water damaged)": "Alfombra o Pared de yeso (con daño visible por agua)",
            "Other Location": "Otra ubicación",

            // Results text
            "Prevention Tips": "Consejos de Prevención",
            "Mold can impact your health and can make the environment you live in get worse for everyone involved. To make sure you do not get mold, get a dehumidifier and set it to 50%. Keep windows open and air flowing. Generally, mold grows due to water in the air; by using a dehumidifier, you can remove that water. Also, regular cleaning (especially with vinegar) helps.": "El moho puede afectar tu salud y empeorar el ambiente en el que vives para todos los involucrados. Para asegurarte de no tener moho, consigue un deshumidificador y configúralo al 50%. Mantén las ventanas abiertas y el aire circulando. Generalmente, el moho crece debido al agua en el aire; usando un deshumidificador, puedes eliminar esa agua. Además, la limpieza regular (especialmente con vinagre) ayuda.",

            "Mildew is fungi that looks flat and powdery. Just clean it off and you should be fine; otherwise it can spread and become more problematic.": "El mildiu es un hongo que se ve plano y polvoriento. Solo límpialo y deberías estar bien; de lo contrario, puede propagarse y volverse más problemático.",

            "The most common type is Stachybotrys chartarum (dark green/black) caused by water damage. Use common household cleaners like bleach, hydrogen peroxide, baking soda, or vinegar to clean small areas. For larger ones, consult a professional.": "El tipo más común es Stachybotrys chartarum (verde oscuro/negro) causado por daños por agua. Usa limpiadores domésticos comunes como lejía, peróxido de hidrógeno, bicarbonato de sodio o vinagre para limpiar áreas pequeñas. Para áreas más grandes, consulta a un profesional.",

            "Powdery mold, often yellow-green or black, growing on various surfaces. Clean smaller areas (non-porous) using bleach (1 cup to 1 gallon of water) or vinegar or 3% hydrogen peroxide in well-ventilated areas. For large or porous areas (drywall, carpet), consult a professional.": "Moho polvoriento, a menudo amarillo-verde o negro, que crece en varias superficies. Limpia áreas más pequeñas (no porosas) usando lejía (1 taza por 1 galón de agua) o vinagre o peróxido de hidrógeno al 3% en áreas bien ventiladas. Para áreas grandes o porosas (pared de yeso, alfombra), consulta a un profesional.",

            "Often blue-green with a velvety texture; common on water-damaged materials and food. For small non-porous areas, clean with soap and water, then disinfect with bleach (1 cup/gallon) or vinegar/peroxide. For porous materials (drywall, carpet) or large areas, consult a professional. Address the root cause (like leaks), use dehumidifiers and good ventilation.": "A menudo azul-verde con una textura aterciopelada; común en materiales dañados por agua y alimentos. Para áreas pequeñas no porosas, limpia con agua y jabón, luego desinfecta con lejía (1 taza/galón) o vinagre/peróxido. Para materiales porosos (pared de yeso, alfombra) o áreas grandes, consulta a un profesional. Aborda la causa raíz (como fugas), usa deshumidificadores y buena ventilación.",

            "Can appear as dark green, brown, or black patches on soil, decaying plants, wood, wallpaper, or carpet. Improve ventilation, control humidity, and use cleaners designed for mold. For big problems, consult professionals.": "Puede aparecer como manchas verde oscuro, marrón o negras en el suelo, plantas en descomposición, madera, papel tapiz o alfombra. Mejora la ventilación, controla la humedad y usa limpiadores diseñados para moho. Para problemas grandes, consulta a profesionales.",

            "Often pink, reddish, or white, grows on water-damaged carpets, drywall, and food. Similar cleaning instructions to penicillium. Discard any affected food. For large or porous areas, consult professionals. Always fix the underlying moisture source.": "A menudo rosa, rojizo o blanco, crece en alfombras dañadas por agua, paredes de yeso y alimentos. Instrucciones de limpieza similares al penicillium. Descarta cualquier alimento afectado. Para áreas grandes o porosas, consulta a profesionales. Siempre soluciona la fuente de humedad subyacente.",

            "Bathroom mold is common due to moisture. Clean with bathroom products and then a bleach solution (1 cup/gallon) or vinegar. Keep the bathroom well-ventilated and check for leaks.": "El moho en el baño es común debido a la humedad. Limpia con productos de baño y luego una solución de lejía (1 taza/galón) o vinagre. Mantén el baño bien ventilado y verifica si hay fugas.",

            "Mold behind fridges or under sinks often relates to condensation or leaks. Clean thoroughly, fix leaks, ensure appliances work properly.": "El moho detrás de los refrigeradores o debajo de los fregaderos a menudo se relaciona con condensación o fugas. Limpia a fondo, arregla las fugas, asegúrate de que los electrodomésticos funcionen correctamente.",

            "Basements/crawl spaces are prone to dampness. Could be Stachybotrys or Cladosporium. Fix moisture sources, improve ventilation, consider a dehumidifier. For big areas, consult professionals.": "Los sótanos/espacios de arrastre son propensos a la humedad. Podría ser Stachybotrys o Cladosporium. Arregla las fuentes de humedad, mejora la ventilación, considera un deshumidificador. Para áreas grandes, consulta a profesionales.",

            "Mold in HVAC systems can spread spores. Do NOT run HVAC if you suspect mold. Professional inspection/cleaning highly recommended. Change filters regularly.": "El moho en los sistemas HVAC puede propagar esporas. NO operes el HVAC si sospechas de moho. Se recomienda encarecidamente una inspección/limpieza profesional. Cambia los filtros regularmente.",

            "Water-damaged carpet or drywall is prime for molds like Fusarium or Stachybotrys. Wet carpet/drywall often need removal. Address water sources. Professional remediation recommended.": "La alfombra o pared de yeso dañada por agua es propicia para mohos como Fusarium o Stachybotrys. La alfombra/pared de yeso húmeda a menudo necesita ser removida. Aborda las fuentes de agua. Se recomienda remediación profesional.",

            "Common food spoilage molds. Discard affected food. Don't scrape mold off soft foods. Clean the storage area thoroughly.": "Mohos comunes de deterioro de alimentos. Descarta los alimentos afectados. No raspes el moho de alimentos blandos. Limpia bien el área de almacenamiento.",

            "It's difficult to pinpoint the exact type or conditions. For accuracy, especially in larger areas or if health concerns exist, consult a professional.": "Es difícil identificar el tipo exacto o las condiciones. Para mayor precisión, especialmente en áreas más grandes o si existen problemas de salud, consulta a un profesional."
        },

        fr: {

            "title": "Outil d'Identification des Moisissures",
            "disclaimer": "Cet outil est simplement un moyen de restreindre et d'identifier les causes possibles de moisissures. NE prenez PAS de décisions uniquement sur la base de cet outil. Vérifiez toujours les résultats obtenus ici pour vous assurer qu'ils sont exacts.",

            // General UI
            "errorLoading": "Erreur de chargement du quiz. Le nœud n'a pas pu être trouvé.",
            "restartQuiz": "Recommencer le Quiz",
            "startOver": "Recommencer",

            // Questions
            "Do you think you have mold?": "Pensez-vous avoir de la moisissure ?",
            "What is the approximate color?": "Quelle est la couleur approximative ?",
            "Is it flat, powdery, and relatively easy to wipe away?": "Est-elle plate, poudreuse et relativement facile à essuyer ?",
            "Is it slimy, wet, dark black, or greenish-black?": "Est-elle visqueuse, humide, noir foncé ou vert-noir ?",
            "Is it powdery, often yellow-green or black?": "Est-elle poudreuse, souvent jaune-vert ou noire ?",
            "Select the best color description:": "Sélectionnez la meilleure description de couleur :",
            "Where is the mold located primarily?": "Où se trouve principalement la moisissure ?",
            "Select the general location:": "Sélectionnez l'emplacement général :",
            "Is the mold growing on food?": "La moisissure pousse-t-elle sur de la nourriture ?",

            // Options
            "Yes": "Oui",
            "No": "Non",
            "Check the database": "Consulter la base de données",
            "Yellow / Gray": "Jaune / Gris",
            "Other (Black, Green, Brown, Pink, etc.)": "Autre (Noir, Vert, Marron, Rose, etc.)",
            "Green / Blue-Green": "Vert / Bleu-Vert",
            "Brown / Olive / Dark": "Marron / Olive / Foncé",
            "Pink / White / Reddish": "Rose / Blanc / Rougeâtre",
            "Other / Unsure": "Autre / Incertain",
            "Bathroom (Tiles, Shower, Sink area)": "Salle de bain (Carrelage, Douche, Zone du lavabo)",
            "Kitchen (Behind fridge, Under sink)": "Cuisine (Derrière le réfrigérateur, Sous l'évier)",
            "None of the above / Somewhere else": "Aucun des précédents / Ailleurs",
            "Basement / Crawl space": "Sous-sol / Vide sanitaire",
            "HVAC / Air vent": "Système CVC / Bouche d'aération",
            "Carpet or Drywall (visibly water damaged)": "Moquette ou Cloison sèche (visiblement endommagée par l'eau)",
            "Other Location": "Autre emplacement",

            // Results text
            "Prevention Tips": "Conseils de Prévention",
            "Mold can impact your health and can make the environment you live in get worse for everyone involved. To make sure you do not get mold, get a dehumidifier and set it to 50%. Keep windows open and air flowing. Generally, mold grows due to water in the air; by using a dehumidifier, you can remove that water. Also, regular cleaning (especially with vinegar) helps.": "La moisissure peut affecter votre santé et détériorer l'environnement dans lequel vous vivez pour tous les occupants. Pour éviter l'apparition de moisissure, utilisez un déshumidificateur réglé à 50%. Gardez les fenêtres ouvertes et l'air circulant. Généralement, la moisissure se développe en raison de l'eau dans l'air ; en utilisant un déshumidificateur, vous pouvez éliminer cette eau. De plus, un nettoyage régulier (notamment avec du vinaigre) est utile.",

            "Mildew is fungi that looks flat and powdery. Just clean it off and you should be fine; otherwise it can spread and become more problematic.": "L'oïdium est un champignon qui apparaît plat et poudreux. Il suffit de le nettoyer et vous devriez être tranquille ; sinon, il peut se propager et devenir plus problématique.",

            "The most common type is Stachybotrys chartarum (dark green/black) caused by water damage. Use common household cleaners like bleach, hydrogen peroxide, baking soda, or vinegar to clean small areas. For larger ones, consult a professional.": "Le type le plus courant est Stachybotrys chartarum (vert foncé/noir) causé par des dégâts d'eau. Utilisez des nettoyants ménagers courants comme l'eau de Javel, le peroxyde d'hydrogène, le bicarbonate de soude ou le vinaigre pour nettoyer les petites zones. Pour les zones plus grandes, consultez un professionnel.",

            "Powdery mold, often yellow-green or black, growing on various surfaces. Clean smaller areas (non-porous) using bleach (1 cup to 1 gallon of water) or vinegar or 3% hydrogen peroxide in well-ventilated areas. For large or porous areas (drywall, carpet), consult a professional.": "Moisissure poudreuse, souvent jaune-vert ou noire, se développant sur diverses surfaces. Nettoyez les petites zones (non poreuses) en utilisant de l'eau de Javel (1 tasse pour 1 gallon d'eau) ou du vinaigre ou du peroxyde d'hydrogène à 3% dans des zones bien ventilées. Pour les grandes zones ou les surfaces poreuses (cloison sèche, moquette), consultez un professionnel.",

            "Often blue-green with a velvety texture; common on water-damaged materials and food. For small non-porous areas, clean with soap and water, then disinfect with bleach (1 cup/gallon) or vinegar/peroxide. For porous materials (drywall, carpet) or large areas, consult a professional. Address the root cause (like leaks), use dehumidifiers and good ventilation.": "Souvent bleu-vert avec une texture veloutée ; fréquente sur les matériaux endommagés par l'eau et les aliments. Pour les petites zones non poreuses, nettoyez avec de l'eau et du savon, puis désinfectez avec de l'eau de Javel (1 tasse/gallon) ou du vinaigre/peroxyde. Pour les matériaux poreux (cloison sèche, moquette) ou les grandes zones, consultez un professionnel. Traitez la cause profonde (comme les fuites), utilisez des déshumidificateurs et assurez une bonne ventilation.",

            "Can appear as dark green, brown, or black patches on soil, decaying plants, wood, wallpaper, or carpet. Improve ventilation, control humidity, and use cleaners designed for mold. For big problems, consult professionals.": "Peut apparaître sous forme de taches vert foncé, marron ou noires sur le sol, les plantes en décomposition, le bois, le papier peint ou la moquette. Améliorez la ventilation, contrôlez l'humidité et utilisez des nettoyants conçus pour les moisissures. Pour les problèmes importants, consultez des professionnels.",

            "Often pink, reddish, or white, grows on water-damaged carpets, drywall, and food. Similar cleaning instructions to penicillium. Discard any affected food. For large or porous areas, consult professionals. Always fix the underlying moisture source.": "Souvent rose, rougeâtre ou blanc, se développe sur les moquettes endommagées par l'eau, les cloisons sèches et les aliments. Instructions de nettoyage similaires au penicillium. Jetez tout aliment affecté. Pour les zones étendues ou poreuses, consultez des professionnels. Réparez toujours la source d'humidité sous-jacente.",

            "Bathroom mold is common due to moisture. Clean with bathroom products and then a bleach solution (1 cup/gallon) or vinegar. Keep the bathroom well-ventilated and check for leaks.": "La moisissure dans la salle de bain est courante en raison de l'humidité. Nettoyez avec des produits pour salle de bain puis une solution d'eau de Javel (1 tasse/gallon) ou du vinaigre. Gardez la salle de bain bien ventilée et vérifiez les fuites.",

            "Mold behind fridges or under sinks often relates to condensation or leaks. Clean thoroughly, fix leaks, ensure appliances work properly.": "La moisissure derrière les réfrigérateurs ou sous les éviers est souvent liée à la condensation ou aux fuites. Nettoyez soigneusement, réparez les fuites, assurez-vous que les appareils fonctionnent correctement.",

            "Basements/crawl spaces are prone to dampness. Could be Stachybotrys or Cladosporium. Fix moisture sources, improve ventilation, consider a dehumidifier. For big areas, consult professionals.": "Les sous-sols/vides sanitaires sont sujets à l'humidité. Pourrait être Stachybotrys ou Cladosporium. Réparez les sources d'humidité, améliorez la ventilation, envisagez un déshumidificateur. Pour les grandes zones, consultez des professionnels.",

            "Mold in HVAC systems can spread spores. Do NOT run HVAC if you suspect mold. Professional inspection/cleaning highly recommended. Change filters regularly.": "La moisissure dans les systèmes CVC peut propager des spores. NE faites PAS fonctionner le système CVC si vous soupçonnez la présence de moisissure. Inspection/nettoyage professionnel fortement recommandé. Changez les filtres régulièrement.",

            "Water-damaged carpet or drywall is prime for molds like Fusarium or Stachybotrys. Wet carpet/drywall often need removal. Address water sources. Professional remediation recommended.": "La moquette ou la cloison sèche endommagée par l'eau est propice aux moisissures comme Fusarium ou Stachybotrys. La moquette/cloison sèche mouillée nécessite souvent un retrait. Traitez les sources d'eau. Assainissement professionnel recommandé.",

            "Common food spoilage molds. Discard affected food. Don't scrape mold off soft foods. Clean the storage area thoroughly.": "Moisissures communes de détérioration des aliments. Jetez les aliments affectés. Ne grattez pas la moisissure des aliments mous. Nettoyez soigneusement la zone de stockage.",

            "It's difficult to pinpoint the exact type or conditions. For accuracy, especially in larger areas or if health concerns exist, consult a professional.": "Il est difficile d'identifier précisément le type exact ou les conditions. Pour plus de précision, surtout dans les zones plus grandes ou si des problèmes de santé existent, consultez un professionnel."
        },

    zh: {
        "title": "霉菌识别工具",
        "disclaimer": "本工具只是帮助你缩小范围/弄清楚霉菌可能的原因的一种方式。不要仅依赖本工具做出决定。请始终再次检查你在此处得到的结果并确保其正确。",

        "errorLoading": "加载测验时出错。无法找到节点。",
        "restartQuiz": "重新开始测验",
        "startOver": "重新开始",

        "Do you think you have mold?": "你认为你有霉菌问题吗？",
        "What is the approximate color?": "大致是什么颜色？",
        "Is it flat, powdery, and relatively easy to wipe away?": "它是平的、粉状的，且比较容易擦掉吗？",
        "Is it slimy, wet, dark black, or greenish-black?": "它是黏滑的、潮湿的、深黑色或黑绿色的吗？",
        "Is it powdery, often yellow-green or black?": "它是粉状的，通常是黄绿色或黑色的吗？",
        "Select the best color description:": "选择最贴近的颜色描述：",
        "Where is the mold located primarily?": "霉菌主要出现在什么地方？",
        "Select the general location:": "选择大致的位置：",
        "Is the mold growing on food?": "霉菌是否在食物上生长？",

        "Yes": "是",
        "No": "否",
        "Check the database": "查看数据库",
        "Yellow / Gray": "黄色 / 灰色",
        "Other (Black, Green, Brown, Pink, etc.)": "其他（黑色、绿色、棕色、粉色等）",
        "Green / Blue-Green": "绿色 / 蓝绿色",
        "Brown / Olive / Dark": "棕色 / 橄榄色 / 深色",
        "Pink / White / Reddish": "粉色 / 白色 / 红色系",
        "Other / Unsure": "其他 / 不确定",
        "Bathroom (Tiles, Shower, Sink area)": "浴室（瓷砖、淋浴、洗手池区域）",
        "Kitchen (Behind fridge, Under sink)": "厨房（冰箱后、洗碗池下）",
        "None of the above / Somewhere else": "以上都不是 / 其他地方",
        "Basement / Crawl space": "地下室 / 爬行空间",
        "HVAC / Air vent": "暖通系统 / 通风口",
        "Carpet or Drywall (visibly water damaged)": "地毯或石膏板（明显水损）",
        "Other Location": "其他位置",

        "Prevention Tips": "预防建议",
        "Mold can impact your health and can make the environment you live in get worse for everyone involved. To make sure you do not get mold, get a dehumidifier and set it to 50%. Keep windows open and air flowing. Generally, mold grows due to water in the air; by using a dehumidifier, you can remove that water. Also, regular cleaning (especially with vinegar) helps.": "霉菌会影响你的健康，并使你所居住的环境变得更糟。为了避免霉菌，使用除湿机并设定为50%。保持窗户打开和空气流通。通常霉菌是由于空气中水分过多而产生；使用除湿机可以去除这些水分。此外，定期清洁（尤其是用醋）也很有效。",

        "Mildew is fungi that looks flat and powdery. Just clean it off and you should be fine; otherwise it can spread and become more problematic.": "霉是一种看起来平坦且呈粉末状的真菌。只需清理干净通常没事，否则可能会蔓延并变得更严重。",

        "The most common type is Stachybotrys chartarum (dark green/black) caused by water damage. Use common household cleaners like bleach, hydrogen peroxide, baking soda, or vinegar to clean small areas. For larger ones, consult a professional.": "最常见的类型是链格孢霉（深绿色/黑色），由水损引起。使用家用清洁剂如漂白剂、双氧水、小苏打或醋清洁小区域。大面积请咨询专业人士。",

        "Powdery mold, often yellow-green or black, growing on various surfaces. Clean smaller areas (non-porous) using bleach (1 cup to 1 gallon of water) or vinegar or 3% hydrogen peroxide in well-ventilated areas. For large or porous areas (drywall, carpet), consult a professional.": "粉状霉菌通常为黄绿色或黑色，会生长在多种表面。小范围（非多孔）区域用漂白剂（1杯兑1加仑水）或醋或3%双氧水清洗，并保持通风。大范围或多孔区域（石膏板、地毯）请找专业人士处理。",

        "Often blue-green with a velvety texture; common on water-damaged materials and food. For small non-porous areas, clean with soap and water, then disinfect with bleach (1 cup/gallon) or vinegar/peroxide. For porous materials (drywall, carpet) or large areas, consult a professional. Address the root cause (like leaks), use dehumidifiers and good ventilation.": "通常呈蓝绿色，质感如天鹅绒；常见于水损材料和食物。小的非多孔区域先用肥皂水清洁，再用漂白剂（1杯/加仑）或醋/双氧水消毒。对于多孔材料（石膏板、地毯）或大面积问题请找专业人士，并解决根本原因（如漏水），使用除湿机并保持通风。",

        "Can appear as dark green, brown, or black patches on soil, decaying plants, wood, wallpaper, or carpet. Improve ventilation, control humidity, and use cleaners designed for mold. For big problems, consult professionals.": "可能呈深绿色、棕色或黑色，出现在土壤、腐烂植物、木材、墙纸或地毯上。改善通风、控制湿度，并使用专门的霉菌清洁剂。大面积问题请找专业人员。",

        "Often pink, reddish, or white, grows on water-damaged carpets, drywall, and food. Similar cleaning instructions to penicillium. Discard any affected food. For large or porous areas, consult professionals. Always fix the underlying moisture source.": "常见颜色为粉红、红色或白色，出现在水损地毯、石膏板和食物上。清洁方法与青霉相似。丢弃受污染的食物。大面积或多孔表面请找专业人士。一定要解决水分来源问题。",

        "Bathroom mold is common due to moisture. Clean with bathroom products and then a bleach solution (1 cup/gallon) or vinegar. Keep the bathroom well-ventilated and check for leaks.": "浴室因为潮湿容易产生霉菌。先用浴室清洁剂清洗，再用漂白水（1杯/加仑）或醋处理。保持浴室通风，并检查是否有泄漏。",

        "Mold behind fridges or under sinks often relates to condensation or leaks. Clean thoroughly, fix leaks, ensure appliances work properly.": "冰箱后面或水槽下方的霉菌通常与冷凝或漏水有关。彻底清洁，修复漏水，确保设备正常运作。",

        "Basements/crawl spaces are prone to dampness. Could be Stachybotrys or Cladosporium. Fix moisture sources, improve ventilation, consider a dehumidifier. For big areas, consult professionals.": "地下室/爬行空间易潮湿，可能是链格孢霉或枝孢霉。修复湿源，改善通风，考虑使用除湿机。大面积请咨询专业人士。",

        "Mold in HVAC systems can spread spores. Do NOT run HVAC if you suspect mold. Professional inspection/cleaning highly recommended. Change filters regularly.": "HVAC系统中的霉菌会传播孢子。如果怀疑有霉菌，不要运行HVAC系统。强烈建议进行专业检查和清洁。定期更换过滤器。",

        "Water-damaged carpet or drywall is prime for molds like Fusarium or Stachybotrys. Wet carpet/drywall often need removal. Address water sources. Professional remediation recommended.": "水损地毯或石膏板是镰刀菌或链格孢霉等霉菌的温床。潮湿地毯或石膏板通常需要移除。修复水源。建议专业处理。",

        "Common food spoilage molds. Discard affected food. Don't scrape mold off soft foods. Clean the storage area thoroughly.": "常见食物变质霉菌。丢弃受污染食物。不要刮掉软食物上的霉菌。彻底清洁存储区域。",

        "It's difficult to pinpoint the exact type or conditions. For accuracy, especially in larger areas or if health concerns exist, consult a professional.": "准确判断类型或情况是困难的。为确保准确，尤其是在较大区域或存在健康顾虑时，请咨询专业人士。"
    },

    de: {
        "title": "Schimmel-Erkennungstool",
        "disclaimer": "Dieses Tool dient lediglich dazu, mögliche Ursachen für Schimmel einzugrenzen oder herauszufinden. TREFFEN SIE KEINE ENTSCHEIDUNGEN AUSSCHLIESSLICH AUFGRUND DIESES TOOLS. Überprüfen Sie immer die hier erhaltenen Ergebnisse und stellen Sie sicher, dass sie korrekt sind.",

        "errorLoading": "Fehler beim Laden des Quiz. Der Knoten konnte nicht gefunden werden.",
        "restartQuiz": "Quiz neu starten",
        "startOver": "Von vorne beginnen",

        // Questions
        "Do you think you have mold?": "Glauben Sie, dass Sie Schimmel haben?",
        "What is the approximate color?": "Was ist die ungefähre Farbe?",
        "Is it flat, powdery, and relatively easy to wipe away?": "Ist er flach, puderig und relativ leicht zu entfernen?",
        "Is it slimy, wet, dark black, or greenish-black?": "Ist er schleimig, nass, tiefschwarz oder grünlich-schwarz?",
        "Is it powdery, often yellow-green or black?": "Ist er puderig, oft gelb-grün oder schwarz?",
        "Select the best color description:": "Wählen Sie die beste Farbbeschreibung:",
        "Where is the mold located primarily?": "Wo befindet sich der Schimmel hauptsächlich?",
        "Select the general location:": "Wählen Sie den allgemeinen Ort:",
        "Is the mold growing on food?": "Wächst der Schimmel auf Lebensmitteln?",

        // Options
        "Yes": "Ja",
        "No": "Nein",
        "Check the database": "Datenbank prüfen",
        "Yellow / Gray": "Gelb / Grau",
        "Other (Black, Green, Brown, Pink, etc.)": "Andere (Schwarz, Grün, Braun, Rosa usw.)",
        "Green / Blue-Green": "Grün / Blau-Grün",
        "Brown / Olive / Dark": "Braun / Oliv / Dunkel",
        "Pink / White / Reddish": "Rosa / Weiß / Rötlich",
        "Other / Unsure": "Andere / Unsicher",
        "Bathroom (Tiles, Shower, Sink area)": "Badezimmer (Fliesen, Dusche, Waschbeckenbereich)",
        "Kitchen (Behind fridge, Under sink)": "Küche (Hinter dem Kühlschrank, Unter der Spüle)",
        "None of the above / Somewhere else": "Keines der oben genannten / Woanders",
        "Basement / Crawl space": "Keller / Kriechkeller",
        "HVAC / Air vent": "HLK-System / Lüftungsschacht",
        "Carpet or Drywall (visibly water damaged)": "Teppich oder Trockenbau (sichtbar wassergeschädigt)",
        "Other Location": "Anderer Ort",

        // Results text
        "Prevention Tips": "Tipps zur Vorbeugung",
        "Mold can impact your health and can make the environment you live in get worse for everyone involved. To make sure you do not get mold, get a dehumidifier and set it to 50%. Keep windows open and air flowing. Generally, mold grows due to water in the air; by using a dehumidifier, you can remove that water. Also, regular cleaning (especially with vinegar) helps.": "Schimmel kann Ihre Gesundheit beeinträchtigen und die Lebensumgebung für alle verschlechtern. Um Schimmel zu vermeiden, verwenden Sie einen Luftentfeuchter und stellen Sie ihn auf 50 % ein. Halten Sie Fenster geöffnet und sorgen Sie für Luftzirkulation. Schimmel entsteht meist durch Feuchtigkeit in der Luft – mit einem Luftentfeuchter können Sie diese entfernen. Regelmäßiges Reinigen (besonders mit Essig) hilft ebenfalls.",

        "Mildew is fungi that looks flat and powdery. Just clean it off and you should be fine; otherwise it can spread and become more problematic.": "Mehltau ist ein Pilz, der flach und puderartig aussieht. Reinigen Sie ihn einfach, dann sollte alles gut sein – sonst kann er sich ausbreiten und problematisch werden.",

        "The most common type is Stachybotrys chartarum (dark green/black) caused by water damage. Use common household cleaners like bleach, hydrogen peroxide, baking soda, or vinegar to clean small areas. For larger ones, consult a professional.": "Die häufigste Art ist Stachybotrys chartarum (dunkelgrün/schwarz), verursacht durch Wasserschäden. Verwenden Sie Haushaltsreiniger wie Bleichmittel, Wasserstoffperoxid, Natron oder Essig für kleine Flächen. Bei größeren Bereichen konsultieren Sie einen Fachmann.",

        "Powdery mold, often yellow-green or black, growing on various surfaces. Clean smaller areas (non-porous) using bleach (1 cup to 1 gallon of water) or vinegar or 3% hydrogen peroxide in well-ventilated areas. For large or porous areas (drywall, carpet), consult a professional.": "Puderiger Schimmel, oft gelb-grün oder schwarz, wächst auf verschiedenen Oberflächen. Reinigen Sie kleine nicht-poröse Flächen mit Bleichmittel (1 Tasse pro 4 Liter Wasser), Essig oder 3%igem Wasserstoffperoxid in gut belüfteten Bereichen. Für große oder poröse Flächen (z. B. Trockenbau, Teppich) wenden Sie sich an einen Fachmann.",

        "Often blue-green with a velvety texture; common on water-damaged materials and food. For small non-porous areas, clean with soap and water, then disinfect with bleach (1 cup/gallon) or vinegar/peroxide. For porous materials (drywall, carpet) or large areas, consult a professional. Address the root cause (like leaks), use dehumidifiers and good ventilation.": "Häufig blau-grün mit samtiger Textur; tritt oft bei wasserbeschädigten Materialien und Lebensmitteln auf. Kleine nicht-poröse Flächen mit Seife und Wasser reinigen, dann mit Bleichmittel (1 Tasse pro 4 Liter) oder Essig/Peroxid desinfizieren. Bei porösen Materialien oder großen Flächen: Fachmann beauftragen. Ursachen wie Lecks beheben, Entfeuchter und gute Belüftung verwenden.",

        "Can appear as dark green, brown, or black patches on soil, decaying plants, wood, wallpaper, or carpet. Improve ventilation, control humidity, and use cleaners designed for mold. For big problems, consult professionals.": "Kann als dunkelgrüne, braune oder schwarze Flecken auf Erde, verrottenden Pflanzen, Holz, Tapeten oder Teppichen erscheinen. Belüftung verbessern, Feuchtigkeit regulieren und schimmelspezifische Reiniger verwenden. Bei großen Problemen: Fachleute hinzuziehen.",

        "Often pink, reddish, or white, grows on water-damaged carpets, drywall, and food. Similar cleaning instructions to penicillium. Discard any affected food. For large or porous areas, consult professionals. Always fix the underlying moisture source.": "Oft rosa, rötlich oder weiß; wächst auf wassergeschädigten Teppichen, Trockenbau und Lebensmitteln. Reinigung wie bei Penicillium. Betroffene Lebensmittel entsorgen. Bei großen oder porösen Flächen: Fachleute kontaktieren. Feuchtigkeitsquellen immer beheben.",

        "Bathroom mold is common due to moisture. Clean with bathroom products and then a bleach solution (1 cup/gallon) or vinegar. Keep the bathroom well-ventilated and check for leaks.": "Schimmel im Badezimmer ist wegen Feuchtigkeit häufig. Mit Badreiniger reinigen, dann mit Bleichlösung (1 Tasse/4 Liter) oder Essig nachbehandeln. Bad gut lüften und auf Lecks prüfen.",

        "Mold behind fridges or under sinks often relates to condensation or leaks. Clean thoroughly, fix leaks, ensure appliances work properly.": "Schimmel hinter Kühlschränken oder unter Spülen entsteht oft durch Kondensation oder Lecks. Gründlich reinigen, Lecks beheben, Geräte überprüfen.",

        "Basements/crawl spaces are prone to dampness. Could be Stachybotrys or Cladosporium. Fix moisture sources, improve ventilation, consider a dehumidifier. For big areas, consult professionals.": "Keller/Kriechkeller sind anfällig für Feuchtigkeit. Es könnte sich um Stachybotrys oder Cladosporium handeln. Feuchtigkeitsquellen beseitigen, Belüftung verbessern, eventuell Entfeuchter verwenden. Bei großen Bereichen: Fachleute hinzuziehen.",

        "Mold in HVAC systems can spread spores. Do NOT run HVAC if you suspect mold. Professional inspection/cleaning highly recommended. Change filters regularly.": "Schimmel in HLK-Systemen kann Sporen verbreiten. HLK nicht verwenden, wenn Schimmel vermutet wird. Fachgerechte Inspektion/Reinigung dringend empfohlen. Filter regelmäßig wechseln.",

        "Water-damaged carpet or drywall is prime for molds like Fusarium or Stachybotrys. Wet carpet/drywall often need removal. Address water sources. Professional remediation recommended.": "Wassergeschädigte Teppiche oder Trockenbau sind ideal für Schimmel wie Fusarium oder Stachybotrys. Nasser Teppich oder Trockenbau muss oft entfernt werden. Wasserschäden beseitigen. Fachgerechte Sanierung empfohlen.",

        "Common food spoilage molds. Discard affected food. Don't scrape mold off soft foods. Clean the storage area thoroughly.": "Häufige Schimmelarten bei verdorbenen Lebensmitteln. Betroffene Lebensmittel wegwerfen. Kein Abschaben von weichem Essen. Lagerbereich gründlich reinigen.",

        "It's difficult to pinpoint the exact type or conditions. For accuracy, especially in larger areas or if health concerns exist, consult a professional.": "Es ist schwierig, die genaue Art oder Ursache zu bestimmen. Für genauere Ergebnisse – besonders bei größeren Flächen oder Gesundheitsbedenken – sollte ein Fachmann hinzugezogen werden."
    },

};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && ['en', 'es', 'fr'].includes(savedLanguage)) {
            setLanguage(savedLanguage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translations }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
