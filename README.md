# LEDAA Chat Interface

LEDAA project is about building a conversational AI assistant for [FRAGMENT's toolkit (API)](https://fragment.dev/docs). Towards this purpose, the **LEDAA Chat Interface** is a web-based conversational interface that allows users to interact with the LEDAA conversational AI assistant.

This project demonstrates a <strong>conversational AI</strong> assistant that can help answer queries related to [Fragement&apos;s toolkit (API)](https://fragment.dev/docs).

Main priority for this prototype is to demonstrate an AI assistant for FRAGMENT&apos; documentation and to present a <strong> Retrieval Augmented Generation (RAG)</strong>-based pipeline and workflow with automation for handling source data updates to ensure AI assistant can answer user queries related to the documentation <strong>effectively</strong> and <strong>accurately</strong>.

To learn more check: [Building AI Assistant for FRAGMENT documentation](https://www.pkural.ca/blog/posts/fragment/)

## LEDAA Data Process Flow

Below is the process flow for how ground truth data updates are handled and how the knowledge base is effectively updated.

1. [`ledaa_updates_scanner`](https://github.com/pranav-kural/ledaa-updates-scanner) Lambda function monitors for changes in content of documentation.
2. On detecting changes, it triggers the [`ledaa_load_data`](https://github.com/pranav-kural/ledaa-load-data) Lambda function passing it the URL of webpage.
3. `ledaa_load_data` Lambda function invokes the [`ledaa_text_splitter`](https://github.com/pranav-kural/ledaa-text-splitter) Lambda function to initiate the process of scraping data from a given URL and to get a list of strings (representing text chunks or documents) which will be used in data ingestion.
4. `ledaa_text_splitter` Lambda function invokes the [`ledaa_web_scrapper`](https://github.com/pranav-kural/ledaa-web-scrapper) Lambda function to scrape the URL and store the processed markdown data in S3. `ledaa_web_scrapper` function also stores the hash of the processed data in DynamoDB which will later be compared by `ledaa_updates_scanner` function to detect changes.
5. On receiving processed document chunks back, `ledaa_load_data` Lambda function stores the data in the vector store.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Local Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## LICENSE

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
