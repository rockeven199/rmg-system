package com.rockeven199.rmg.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Purchase {
    private int purchase_id;
    private String purchase_name;
    private int purchase_count;
    private String purchase_start_time;
    private String purchase_end_time;
    private String purchase_state;
}
