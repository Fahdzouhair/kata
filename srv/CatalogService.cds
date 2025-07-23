using { my.Kata as my } from '../db/schema';

Service CatalogService @(requires: 'authenticated-user') {
    entity Books as projection on my.Book ;

}
