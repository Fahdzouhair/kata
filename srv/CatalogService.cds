using { my.Kata as my } from '../db/schema';

Service CatalogService {
    @Capabilities : { 
        Insertable : false, Updatable: false, Deletable : false,
     } 
    entity PurchaseHostories as projection on my.PurchaseHostory;

    @(requires: 'authenticated-user')
    @Capabilities : { 
        Updatable : false, Deletable : false
     }
    entity Books as projection on my.Book ;
    
    

}
