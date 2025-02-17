import { SchemaTypeDefinition } from 'sanity'
import post from './post'
import author from './author'
import category from './category'
import settings from './settings'
import blockContent from './blockContent'
import navigation from './navigation'
import hero from './hero'

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  author,
  category,
  settings,
  blockContent,
  navigation,
  hero
] 