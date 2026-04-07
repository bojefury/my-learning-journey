def process_dungeon_entry(player_level, party_size, has_key, dungeon_type):
    if dungeon_type == "normal":
      required_fee = 50
      can_enter = True
    elif dungeon_type == "heroic":
      required_fee = 200
      can_enter = True
    else:
      required_fee = 0
      can_enter = False


    if player_level >= 20 and has_key == True and can_enter == True:
       can_enter = True
    else:
        can_enter = False


    if party_size == 4:
        required_fee *= 0.75
    if party_size > 5:
        required_fee += 50


    if player_level < 20:
        warning_message = "Too weak"
    elif has_key == False:
        warning_message = "No Key"
    else:
         warning_message = "Welcome"


    return can_enter, required_fee, warning_message
