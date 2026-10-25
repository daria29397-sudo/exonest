const priceFormatter = new Intl.NumberFormat('uk-UA', {
  maximumFractionDigits: 0,
})

export const formatPrice = (value: number) => `${priceFormatter.format(value)} ₴`

const dateFormatter = new Intl.DateTimeFormat('uk-UA', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export const formatDate = (iso: string) => dateFormatter.format(new Date(iso))
