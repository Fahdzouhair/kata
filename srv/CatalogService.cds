using { my.Kata as my } from '../db/schema';

Service CatalogService{
    entity Books as projection on my.Book ;
}
