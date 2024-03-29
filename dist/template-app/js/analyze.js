/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

function analyzeSentimentOfText(text) {
  // [START language_sentiment_string]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language').v1beta2;

  // Creates a v1beta2 client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
  // const text = 'Your text to analyze, e.g. Hello, world!';

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the document
  client
    .analyzeSentiment({document: document})
    .then(results => {
      const sentiment = results[0].documentSentiment;
      var jsonSentences = [];

      const sentences = results[0].sentences;
      sentences.forEach(sentence => {
        jsonSentences.push({
          sentence: sentence.text.content,
          score: sentence.sentiment.score,
          magnitude: sentence.sentiment.magnitude
        });
      });

      var jsonMain = {
        main: { 
          score: sentiment.score,
          magnitude: sentiment.magnitude
        },
        sentences: jsonSentences
      };

      console.log(JSON.stringify(jsonMain));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END language_sentiment_string]
}

function analyzeSentimentInFile(bucketName, fileName) {
  // [START language_sentiment_file]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language').v1beta2;

  // Creates a v1beta2 client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following lines to run this code
   */
  // const bucketName = 'Your bucket name, e.g. my-bucket';
  // const fileName = 'Your file name, e.g. my-file.txt';

  // Prepares a document, representing a text file in Cloud Storage
  const document = {
    gcsContentUri: `gs://${bucketName}/${fileName}`,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the document
  client
    .analyzeSentiment({document: document})
    .then(results => {
      const sentiment = results[0].documentSentiment;
      var jsonSentences = [];

      const sentences = results[0].sentences;
      sentences.forEach(sentence => {
        jsonSentences.push({
          sentence: sentence.text.content,
          score: sentence.sentiment.score,
          magnitude: sentence.sentiment.magnitude
        });
      });

      var jsonMain = {
        main: { 
          score: sentiment.score,
          magnitude: sentiment.magnitude
        },
        sentences: jsonSentences
      };

      console.log(JSON.stringify(jsonMain));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END language_sentiment_file]
}

function analyzeEntitiesOfText(text) {
  // [START language_entities_string]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language').v1beta2;

  // Creates a v1beta2 client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
  // const text = 'Your text to analyze, e.g. Hello, world!';

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects entities in the document
  client
    .analyzeEntities({document: document})
    .then(results => {
      const entities = results[0].entities;
      var jsonEntities = [];

      entities.forEach(entity => {
        jsonEntities.push({
          name: entity.name,
          type: entity.type,
          salience: entity.salience,
          url: entity.metadata && entity.metadata.wikipedia_url ? entity.metadata.wikipedia_url : null,
          mentions : entity.mentions
        });
      });

      var jsonMain = {
        entities: jsonEntities
      };

      console.log(JSON.stringify(jsonMain));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END language_entities_string]
}

function analyzeEntitiesInFile(bucketName, fileName) {
  // [START language_entities_file]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language').v1beta2;

  // Creates a v1beta2 client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following lines to run this code
   */
  // const bucketName = 'Your bucket name, e.g. my-bucket';
  // const fileName = 'Your file name, e.g. my-file.txt';

  // Prepares a document, representing a text file in Cloud Storage
  const document = {
    gcsContentUri: `gs://${bucketName}/${fileName}`,
    type: 'PLAIN_TEXT',
  };

  // Detects entities in the document
  client
    .analyzeEntities({document: document})
    .then(results => {
      const entities = results[0].entities;
      var jsonEntities = [];

      entities.forEach(entity => {
        jsonEntities.push({
          name: entity.name,
          type: entity.type,
          salience: entity.salience,
          url: entity.metadata && entity.metadata.wikipedia_url ? entity.metadata.wikipedia_url : null,
          mentions: entity.mentions
        });
      });

      var jsonMain = {
        entities: jsonEntities
      };

      console.log(JSON.stringify(jsonMain));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END language_entities_file]
}

function analyzeSyntaxOfText(text) {
  // [START language_syntax_string]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language').v1beta2;

  // Creates a v1beta2 client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
  // const text = 'Your text to analyze, e.g. Hello, world!';

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects syntax in the document
  client
    .analyzeSyntax({document: document})
    .then(results => {
      const syntax = results[0];
      var jsonTokens = [];

      syntax.tokens.forEach(part => {
        jsonTokens.push({
          tag: part.partOfSpeech.tag,
          content: part.text.content,
          morphology: part.partOfSpeech,
        });
      });

      var jsonMain = {
        tokens: jsonTokens
      };

      console.log(JSON.stringify(jsonMain));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END language_syntax_string]
}

function analyzeSyntaxInFile(bucketName, fileName) {
  // [START language_syntax_file]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language').v1beta2;

  // Creates a v1beta2 client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following lines to run this code
   */
  // const bucketName = 'Your bucket name, e.g. my-bucket';
  // const fileName = 'Your file name, e.g. my-file.txt';

  // Prepares a document, representing a text file in Cloud Storage
  const document = {
    gcsContentUri: `gs://${bucketName}/${fileName}`,
    type: 'PLAIN_TEXT',
  };

  // Detects syntax in the document
  client
    .analyzeSyntax({document: document})
    .then(results => {
      const syntax = results[0];
      var jsonTokens = [];

      syntax.tokens.forEach(part => {
        jsonSyntax.push({
          tag: part.partOfSpeech.tag,
          content: part.text.content,
          morphology: part.partOfSpeech,
        });
      });

      var jsonMain = {
        tokens: jsonTokens
      };

      console.log(JSON.stringify(jsonMain));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END language_syntax_file]
}

function classifyTextOfText(text) {
  // [START language_classify_string]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language').v1beta2;

  // Creates a v1beta2 client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
  // const text = 'Your text to analyze, e.g. Hello, world!';

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Classifies text in the document
  client
    .classifyText({document: document})
    .then(results => {
      const classification = results[0];
      var jsonCategories = [];

      classification.categories.forEach(category => {
        jsonCategories.push({
          name: category.name,
          confidence: category.confidence
        });
      });

      var jsonMain = {
        categories: jsonCategories
      };

      console.log(JSON.stringify(jsonMain));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END language_classify_string]
}

function classifyTextInFile(bucketName, fileName) {
  // [START language_classify_file]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language').v1beta2;

  // Creates a v1beta2 client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following lines to run this code
   */
  // const bucketName = 'Your bucket name, e.g. my-bucket';
  // const fileName = 'Your file name, e.g. my-file.txt';

  // Prepares a document, representing a text file in Cloud Storage
  const document = {
    gcsContentUri: `gs://${bucketName}/${fileName}`,
    type: 'PLAIN_TEXT',
  };

  // Classifies text in the document
  client
    .classifyText({document: document})
    .then(results => {
      const classification = results[0];
      var jsonCategories = [];

      classification.categories.forEach(category => {
        jsonCategories.push({
          name: category.name,
          confidence: category.confidence
        });
      });

      var jsonMain = {
        categories: jsonCategories
      };

      console.log(JSON.stringify(jsonMain));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END language_classify_file]
}

require(`yargs`)
  .demand(1)
  .command(
    `sentiment-text <text>`,
    `Detects sentiment of a string.`,
    {},
    opts => analyzeSentimentOfText(opts.text)
  )
  .command(
    `sentiment-file <bucketName> <fileName>`,
    `Detects sentiment in a file in Google Cloud Storage.`,
    {},
    opts => analyzeSentimentInFile(opts.bucketName, opts.fileName)
  )
  .command(`entities-text <text>`, `Detects entities in a string.`, {}, opts =>
    analyzeEntitiesOfText(opts.text)
  )
  .command(
    `entities-file <bucketName> <fileName>`,
    `Detects entities in a file in Google Cloud Storage.`,
    {},
    opts => analyzeEntitiesInFile(opts.bucketName, opts.fileName)
  )
  .command(`syntax-text <text>`, `Detects syntax of a string.`, {}, opts =>
    analyzeSyntaxOfText(opts.text)
  )
  .command(
    `syntax-file <bucketName> <fileName>`,
    `Detects syntax in a file in Google Cloud Storage.`,
    {},
    opts => analyzeSyntaxInFile(opts.bucketName, opts.fileName)
  )
  .command(`classify-text <text>`, `Classifies text of a string.`, {}, opts =>
    classifyTextOfText(opts.text)
  )
  .command(
    `classify-file <bucketName> <fileName>`,
    `Classifies text in a file in Google Cloud Storage.`,
    {},
    opts => classifyTextInFile(opts.bucketName, opts.fileName)
  )
  .example(
    `node $0 sentiment-text "President Obama is speaking at the White House."`
  )
  .example(
    `node $0 sentiment-file my-bucket file.txt`,
    `Detects sentiment in gs://my-bucket/file.txt`
  )
  .example(
    `node $0 entities-text "President Obama is speaking at the White House."`
  )
  .example(
    `node $0 entities-file my-bucket file.txt`,
    `Detects entities in gs://my-bucket/file.txt`
  )
  .example(
    `node $0 syntax-text "President Obama is speaking at the White House."`
  )
  .example(
    `node $0 syntax-file my-bucket file.txt`,
    `Detects syntax in gs://my-bucket/file.txt`
  )
  .example(
    `node $0 classify-text "Android is a mobile operating system developed by Google."`
  )
  .example(
    `node $0 classify-file my-bucket android_text.txt`,
    `Detects syntax in gs://my-bucket/android_text.txt`
  )
  .wrap(120)
  .recommendCommands()
  .epilogue(
    `For more information, see https://cloud.google.com/natural-language/docs`
  )
  .help()
  .strict().argv;