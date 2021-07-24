import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
      this.primengConfig.setTranslation({
        "startsWith": "Starts with",
        "contains": "Contains",
        "notContains": "Not contains",
        "endsWith": "Ends with",
        "equals": "Equals",
        "notEquals": "Not equals",
        "noFilter": "No Filter",
        "lt": "Less than",
        "lte": "Less than or equal to",
        "gt": "Greater than",
        "gte": "Great then or equals",
        "is": "Is",
        "isNot": "Is not",
        "before": "Before",
        "after": "After",
        "clear": "Clear",
        "apply": "Apply",
        "matchAll": "Match All",
        "matchAny": "Match Any",
        "addRule": "Add Rule",
        "removeRule": "Remove Rule",
        "accept": "Yes",
        "reject": "No",
        "choose": "Choose",
        "upload": "Upload",
        "cancel": "Cancel",
        "dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "dayNamesShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        "dayNamesMin": ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],
        "monthNames": ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
        "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        "today": "Today",
        "weekHeader": "Wk",
        "weak": 'Weak',
        "medium": 'Medium',
        "strong": 'Strong',
        "passwordPrompt": 'Enter a password',
        "emptyMessage": 'No results found',
        "emptyFilterMessage": 'No results found'
    });
  }

}
