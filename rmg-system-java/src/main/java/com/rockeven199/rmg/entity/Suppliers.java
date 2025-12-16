package com.rockeven199.rmg.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Suppliers {
    public Integer suppliers_id;
    public String suppliers_name;
    public String suppliers_phone;
    public String suppliers_email;
    public String suppliers_address;
    public String suppliers_description;
    public String suppliers_country;
}
