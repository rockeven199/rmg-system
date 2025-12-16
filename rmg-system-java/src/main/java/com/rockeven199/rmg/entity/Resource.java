package com.rockeven199.rmg.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class Resource {
    Integer resource_id;
    String resource_name;
    String resource_count;
    String resource_position;
    String resource_state;
}
