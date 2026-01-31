const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data - Completely New Test Cases
const TEST_DATA = {
  positive: [
    // Simple Sentences
    {
      tcId: 'Pos_Fun_001',
      name: 'Good morning greeting phrase',
      input: 'suba udhaesanak lamayi!',
      expected: 'සුබ උදැසනක් ලමයි!',
      category: 'Greeting / request / response',
      grammar: 'Simple sentence',
      length: 'S'
    },

    // Compound Sentences
    {
      tcId: 'Pos_Fun_002',
      name: 'Mixed-language input with slang + typo causes incorrect conversion',
      input: 'machan mata  edhaa order karapu item eka track karanna help karannakoo. Delivery status eka SMS ekakath aave nae. Mata eka urgently oona weekend trip eka yanna kalin.  baerinam courier company ekata call ekak gahannam. Thx!',
      expected: 'මචන් මට  එදා order කරපු item එක track කරන්න help කරන්නකෝ. Delivery status එක SMS එකකත් ආවෙ නැ. මට එක urgently ඕන weekend trip එක යන්න කලින්.  බැරිනම් courier company එකට call එකක් ගහන්නම්. ථx!',
      category: 'Mixed Singlish + English',
      grammar: 'Compound sentence',
      length: 'M'
    },

    // Greetings and Responses
    {
      tcId: 'Pos_Fun_003',
      name: 'Medium polite,informal request phrase',
      input: 'eeyi mata ehedhi call ekak ganna puLuvandha oyaata?',
      expected: 'ඒයි මට එහෙදි call එකක් ගන්න පුළුවන්ද ඔයාට?',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'M'
    },
    
    // Complex Sentences
    {
      tcId: 'Pos_Fun_004',
      name: 'Conditional sentence with common English words',
      input: 'traffic eka handhaa enna parakku unaa',
      expected: 'traffic එක හන්දා එන්න පරක්කු උනා',
      category: 'Mixed Singlish + English',
      grammar: 'Complex sentence',
      length: 'M'
    },

    // Commands
    {
      tcId: 'Pos_Fun_005',
      name: 'Short command to arrive',
      input: 'issarahata enna',
      expected: 'ඉස්සරහට එන්න',
      category: 'Daily language usage',
      grammar: 'Imperative (command)',
      length: 'S'
    },
    
    
    {
      tcId: 'Pos_Fun_006',
      name: 'Conditional complex sentence',
      input: 'maedam enavaanam mama kaeema tikak laeesthi karannam kaalaa yanna',
      expected: 'මැඩම් එනවානම් මම කෑම ටිකක් ලෑස්ති කරන්නම් කාලා යන්න',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'M'
    },
    
    // Questions
    {
      tcId: 'Pos_Fun_007',
      name: 'Location-related question with affirmative phrasing',
      input: 'api heta oyaalagee gedhara enavaa.hariyatama thaena kohedha?',
      expected: 'අපි හෙට ඔයාලගේ ගෙදර එනවා.හරියටම තැන කොහෙද?',
      category: 'Daily language usage',
      grammar: 'Interrogative (question)',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_008',
      name: 'Question about time',
      input: 'kavadhadha eyaalaa rata idhan enna innee?',
      expected: 'කවදද එයාලා රට ඉදන් එන්න ඉන්නේ?',
      category: 'Daily language usage',
      grammar: 'Interrogative (question)',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_009',
      name: 'Polite question request',
      input: 'mata ee paadama kiyalaa dhenna puluvandha oyaata?',
      expected: 'මට ඒ පාඩම කියලා දෙන්න පුලුවන්ද ඔයාට?',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'M'
    },
    
    // Commands
    {
      tcId: 'Pos_Fun_010',
      name: 'Direct command expressed in a compound structure',
      input: 'enna, dhaenma meeka hariyata balalaa files tika aran office ekata gihin manager ta dhenna,passe mata call ekakin kiyanna monavadha vune kiyalaa',
      expected: 'එන්න, දැන්ම මේක හරියට බලලා files ටික අරන් office එකට ගිහින් manager ට දෙන්න,පස්සෙ මට call එකකින් කියන්න මොනවද වුනෙ කියලා',
      category: 'Daily language usage',
      grammar: 'Imperative (command)',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_011',
      name: 'Polite command with slang',
      input: 'ela machan! ohoma issarahata yanna',
      expected: 'එල මචන්! ඔහොම ඉස්සරහට යන්න',
      category: 'Greeting / request / response',
      grammar: 'Imperative (command)',
      length: 'S'
    },
    
    // Requests and Responses
    {
      tcId: 'Pos_Fun_012',
      name: 'Polite request for identification',
      input: 'karunaakarala mata oyaage ID eka pennannavadha?',
      expected: 'කරුනාකරල මට ඔයාගෙ ID එක පෙන්නන්නවද?',
      category: 'Greeting / request / response',
      grammar: 'Simple sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_013',
      name: 'Confirmation response',
      input: 'ov oyaa hari eeka gaena thamaa edhaa kiive',
      expected: 'ඔව් ඔයා හරි ඒක ගැන තමා එදා කීවෙ',
      category: 'Greeting / request / response',
      grammar: 'Simple sentence',
      length: 'M'
    },
    
    // Tenses
    {
      tcId: 'Pos_Fun_014',
      name: 'Past tense action',
      input: 'mama iiyee pooyata pansal giyaa',
      expected: 'මම ඊයේ පෝයට පන්සල් ගියා',
      category: 'Daily language usage',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_015',
      name: 'Future tense usage in compound sentences',
      input: 'apith heta ethanata yamu,haebaeyi udhenma yanna oona naethiveyi',
      expected: 'අපිත් හෙට එතනට යමු,හැබැයි උදෙන්ම යන්න ඕන නැතිවෙයි',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'M'
    },
    
    // Negations
    {
      tcId: 'Pos_Fun_016',
      name: 'Simple negation with repeated word expression',
      input: 'hari hari mama dhannee naee eyaa gaena',
      expected: 'හරි හරි මම දන්නේ නෑ එයා ගැන',
      category: 'Daily language usage',
      grammar: 'Negation (negative form)',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_017',
      name: 'Polite negative statement handling',
      input: 'samaavenna mata eeka karanna baee',
      expected: 'සමාවෙන්න මට ඒක කරන්න බෑ',
      category: 'Daily language usage',
      grammar: 'Negation (negative form)',
      length: 'S'
    },
    
    // Plural and Pronouns
    {
      tcId: 'Pos_Fun_018',
      name: 'Plural pronoun handling',
      input: 'eyaalaa kaden kaeema kanavaa dhaekkaa',
      expected: 'එයාලා කඩෙන් කෑම කනවා දැක්කා',
      category: 'Daily language usage',
      grammar: 'Plural form',
      length: 'M'
    },
    
    // Word combination / phrase pattern
    {
      tcId: 'Pos_Fun_019',
      name: 'Handling of common phrases',
      input: 'ohoma innako mama yannam',
      expected: 'ඔහොම ඉන්නකො මම යන්නම්',
      category: 'Word combination / phrase pattern',
      grammar: 'Simple sentence',
      length: 'S'
    },
    
    // Mixed Language
    {
      tcId: 'Pos_Fun_020',
      name: 'English brand term embedded',
      input: 'mata dhaen Instagram account eken login venna bae',
      expected: 'මට දැන් Instagram account එකෙන් login වෙන්න බැ',
      category: 'Mixed Singlish + English',
      grammar: 'Present tense',
      length: 'M'
    },

    //Names / places / common English words
    {
      tcId: 'Pos_Fun_021',
      name: 'Correct handling of place names',
      input: 'sithum colombo yanna inne heta',
      expected: 'සිතුම් colombo යන්න ඉන්නේ හෙට',
      category: 'Names / places / common English words',
      grammar: 'Future tense',
      length: 'S'
    },
    
    // Punctuation
    {
      tcId: 'Pos_Fun_022',
      name: 'Exclamation mark handling',
      input: 'niyamayi! oyaa hodhata karaa',
      expected: 'නියමයි! ඔයා හොදට කරා',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    
    // Numbers and Formats
    {
      tcId: 'Pos_Fun_023',
      name: 'Currency amount',
      input: 'mata Rs. 500k oonee hetata',
      expected: 'මට Rs. 500ක් ඕනේ හෙටට',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    
    // Compound Sentences
    {
      tcId: 'Pos_Fun_024',
      name: 'Compound sentence describing reason for delay',
      input: 'mama dhaenma yannee nae, dhaenma bus eka enne naethi nisaa',
      expected: 'මම දැන්ම යන්නේ නැ, දැන්ම bus එක එන්නෙ නැති නිසා',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'M'
    }
  ],
  
  negative: [
    {
      tcId: 'Neg_Fun_001',
      name: 'Missing space between words',
      input: 'mamaadhatavaedaivarayi',
      expected: 'මම අදට වැඩ ඉවරයි',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_002',
      name: 'Joined compound sentences',
      input: 'mamaadhagedharaenavaahaebaeyiennavelaayayi',
      expected: 'මම අද ගෙදර එනවා හැබැයි එන්න වෙලා යයි.',
      category: 'Typographical error handling',
      grammar: 'Present tense',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_003',
      name: 'Irregular word spacing in input',
      input: 'api       dhaen   gedharayamu',
      expected: 'අපි දැන් ගෙදර යමු',
      category: 'Formatting (spaces / line breaks / paragraph)',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_004',
      name: 'Unexpected line break within sentence',
      input: 'oyaata meeka hariyata karanna puluvannam kiyanna',
      expected: 'ඔයාට මේක\nහරියට කරන්න පුලුවන්නම් කියන්න',
      category: 'Formatting (spaces / line breaks / paragraph)',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_005',
      name: 'Informal slang expression handling',
      input: 'adooo ela kiri wade',
      expected: 'අඩෝ එල කිරි වැඩේ',
      category: 'Slang / informal language',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_006',
      name: 'Informal spoken question handling',
      input: 'machang mokakkdha ara thiyenne',
      expected: 'මචං මොකක්ද අර තියෙන්නෙ?',
      category: 'Slang / informal language',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_007',
      name: 'Mixed English with errors',
      input: 'eyaaZoommeetingekataaawa',
      expected: 'එයා Zoom meeting එකට ආවා',
      category: 'Mixed Singlish + English',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_008',
      name: 'Abbreviation handling in informal sentence',
      input: 'mata oyagee ID eka one',
      expected: 'මට ඔයාගේ ID එක ඕනේ',
      category: 'Names / places / common English words',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_009',
      name: 'Question with missing spaces',
      input: 'oyaageenamamokakdha?',
      expected: 'ඔයාගේ නම මොකක්ද?',
      category: 'Typographical error handling',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_010',
      name: 'Casual slang command',
      input: 'machan man dhunna waedee karanna hariyata',
      expected: 'මචං මං දුන්න වැඩේ කරන්න හරියට',
      category: 'Slang / informal language',
      grammar: 'Imperative (command)',
      length: 'M'
    }
  ],
  
  ui: {
    tcId: 'Pos_UI_001',
    name: 'Real-time translation updates as typing',
    input: 'mama havasata paadam karanavaa',
    partialInput: 'mama havasata paa',
    expectedFull: 'මම හවසට පාඩම් කරනවා',
    category: 'Usability flow',
    grammar: 'Future tense',
    length: 'S'
  }
};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();
      
      // Type partial input
      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
      
      // Wait for partial output
      await page.waitForTimeout(1500);
      
      // Verify partial translation appears
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      // Complete typing
      await input.pressSequentially(TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length), { delay: 150 });
      
      // Wait for full translation
      await translator.waitForOutput();
      
      // Verify full translation
      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);
      
      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});
