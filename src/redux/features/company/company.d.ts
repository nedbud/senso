export interface PhoneInterface {
    key: string
    value: string
}

export interface AddressInterface {
    key: string
    value: string
}

export interface CompanyInterface {
    name: string
    phone: PhoneInterface[]
    address: AddressInterface[]
    logo: string
    cover: string
}