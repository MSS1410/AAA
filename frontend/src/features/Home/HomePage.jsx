import React from 'react'
import BannerCarousel from './BannerSect'
import BestsellerSection from './BestSeller'
import NewArrivalsSect from './NewArrivals'
import AuthorSect from './AuthorSect'
import CategoriesSect from './Categories'
import ListCategories from './ListCategories'
import ReviewsP from './ReviewsP'

export default function HomePage() {
  return (
    <>
      <BannerCarousel />
      <BestsellerSection />
      <NewArrivalsSect />
      <AuthorSect />
      <CategoriesSect />
      {/* Sección por categoría - repetir para cada categoría deseada */}
      <ListCategories
        category='Ciencia Ficción'
        title='Ciencia Ficción'
        viewAllLink='/categories/Ciencia%20Ficción'
      />
      <ListCategories
        category='Ciencia'
        title='Ciencia'
        viewAllLink='/categories/Ciencia'
      />
      <ListCategories
        category='Aventuras'
        title='Aventuras'
        viewAllLink='/categories/Aventuras'
      />
      <ListCategories
        category='Historia'
        title='Historia'
        viewAllLink='/categories/Historia'
      />
      <ListCategories
        category='Psicologia'
        title='Psicología'
        viewAllLink='/categories/Psicologia'
      />
      <ListCategories
        category='Infantiles'
        title='Infantiles'
        viewAllLink='/categories/Infantiles'
      />
      <ListCategories
        category='Natura'
        title='Naturaleza'
        viewAllLink='/categories/Natura'
      />

      <ReviewsP />
    </>
  )
}
