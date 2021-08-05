import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AddListingComponent } from '../site/pages/add-listing/add-listing.component';
import { AddListingComponent } from '../site/pages/page-components/add-listing/add-listing.component';
// pages
import { PageAboutUsComponent } from './pages/page-about-us/page-about-us.component';
import { PageComponentsComponent } from './pages/page-components/page-components.component';
import { PageContactUsOneComponent } from './pages/page-contact-us-one/page-contact-us-one.component';
import { PageContactUsTwoComponent } from './pages/page-contact-us-two/page-contact-us-two.component';
import { PageFaqComponent } from './pages/page-faq/page-faq.component';
import { PageTermsComponent } from './pages/page-terms/page-terms.component';
import { PageTypographyComponent } from './pages/page-typography/page-typography.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'about-us',
    },
    {
        path: 'about-us',
        component: PageAboutUsComponent,
    },
    {
        path: 'contact-us-v1',
        component: PageContactUsOneComponent,
    },
    {
        path: 'contact-us-v2',
        component: PageContactUsTwoComponent,
    },
    {
        path: 'terms',
        component: PageTermsComponent,
    },
    {
        path: 'faq',
        component: PageFaqComponent,
    },
    {
        path: 'components',
        component: PageComponentsComponent,
    },
    {
        path: 'typography',
        component: PageTypographyComponent,
    },
    {
        path: 'add-listing',
        component: AddListingComponent,
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SiteRoutingModule { }
