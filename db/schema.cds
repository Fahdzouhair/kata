using {cuid} from '@sap/cds/common';

namespace my.Kata;

entity Book : cuid {
        title  : String;
        author : String;
}

entity PurchaseHistory : cuid {
    book_id : UUID;
    user_id : UUID;
    date    : Date;
}
