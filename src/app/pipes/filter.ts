import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items || !searchText) {
            return items;
        }

        searchText = searchText.toLowerCase();


        return items.filter(item => {
            // for articles
            if (item?.title)
                return (
                    item.title.toLowerCase().includes(searchText) ||
                    item.content.toLowerCase().includes(searchText) ||
                    item.author.firstname.toLowerCase().includes(searchText) ||
                    item.author.lastname.toLowerCase().includes(searchText) ||
                    item.tel.toLowerCase().includes(searchText) ||
                    item.email.toLowerCase().includes(searchText) ||
                    item.datenai.toLowerCase().includes(searchText)
                );
            // for authors
            else return (
                item.firstname.toLowerCase().includes(searchText) ||
                item.lastname.toLowerCase().includes(searchText) ||
                item.tel.toLowerCase().includes(searchText) ||
                item.email.toLowerCase().includes(searchText) ||
                item.datenai.toLowerCase().includes(searchText)
            );
        });
    }
}