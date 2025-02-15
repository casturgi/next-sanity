"use client";


import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { NextStudio } from "next-sanity/studio";
import { schemaTypes } from "../../../sanity/schemas";


const sanityConfig = defineConfig({
 title: "Sanity CI/CD test",
 projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
 dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
 apiVersion: "2024-04-23",
 basePath: "/admin",
 plugins: [structureTool()],
 schema: {
   types: schemaTypes,
 },
});


export default function AdminPage() {
 return <NextStudio config={sanityConfig} />;
}