using { my.Kata as my } from '../db/schema';

Service CatalogService @(requires: 'authenticated-user') {
    @Capabilities : { 
       Updatable:false, Deletable:false,
     }
    entity Books as projection on my.Book ;

}
