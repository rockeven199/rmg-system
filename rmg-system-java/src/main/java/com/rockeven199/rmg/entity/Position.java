package com.rockeven199.rmg.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class Position {
    private Integer position_id;
    private String position_name;
    private String position_state;
    private String position_description;
    private Integer position_state_code;
}
