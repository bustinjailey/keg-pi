class Keg:
    def __init__(self,
                 keg_id,
                 max_volume,
                 current_volume,
                 beer_id,
                 created_timestamp,
                 last_updated_timestamp,
                 is_active):
        """
        Create a container initialized with information about the size and state of its contents.
        """
        self.keg_id = keg_id
        self.max_volume = max_volume
        self.current_volume = current_volume
        self.beer_id = beer_id
        self.created_timestamp = created_timestamp
        self.last_updated_timestamp = last_updated_timestamp
        self.is_active = is_active

    def pour(self, pour_volume):
        """
        Decrements the current_volume of the keg by the pour_volume amount
        """
        self.current_volume -= pour_volume
