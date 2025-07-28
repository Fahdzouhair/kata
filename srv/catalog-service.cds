using { my.Kata as my } from '../db/schema';

Service CatalogService {
    @Capabilities : { 
      Insertable : false, Updatable : false , Deletable : false, 
     }
    entity PurchaseHistories as projection on my.PurchaseHistory;
    
    @(requires: 'authenticated-user')
    @Capabilities : { 
       Updatable : false, Deletable : false,
     }
    entity Books as projection on my.Book ;

    action buyBook(bookID: UUID) returns PurchaseHistories ;
    
}
