from counter.settings import database
from flask_login import UserMixin

class User(database.Model, UserMixin):
    id = database.Column(database.Integer, primary_key = True)
    name = database.Column(database.String(100), nullable = False)
    password = database.Column(database.String(100), nullable = False)
    group = database.Column(database.Boolean, nullable = False)
    preferances = database.Column(database.Text, nullable = False)
    right_level = database.Column(database.String(255), nullable = False)
    custon_schedules = database.Column(database.Text, nullable = True)
    additional = database.Column(database.Text, nullable = True)
    '''
        Right level may have next values:
        user - Default user, can add homework
        banned - User without rights to edit anything
        admin - User with rights to change anything, starting from homework and ending with entire schedule
    '''
    def __repr__(self):
        return f"User {self.name} with {self.right_level} rights."
    
class Schedule(database.Model):
    id = database.Column(database.Integer, primary_key = True)
    description = database.Column(database.Text, nullable = False)
    day_one = database.Column(database.Text, nullable = True)
    day_two = database.Column(database.Text, nullable = True)
    day_three = database.Column(database.Text, nullable = True)
    day_four = database.Column(database.Text, nullable = True)
    day_five = database.Column(database.Text, nullable = True)
    day_six = database.Column(database.Text, nullable = True)
    day_seven = database.Column(database.Text, nullable = True)

    '''
        Day event should be like "18:00-18:30`Lesson 7~"
        * ` - separator between time and description
        * ~ - separator between events
        SEPARATORS SHOULD BE PROHIBITED FROM USING IN EVENT NAMES
    '''

    def to_dict(self):
        '''
            Returns entire schedule in dict form where key is time "from:end"
            and value is what's happening
        '''
        day_list = [self.day_one, self.day_two, self.day_three, self.day_four, self.day_five, self.day_six, self.day_seven]
        return_dict = {}
        for day in day_list:
            for event in day.split("~"):
                event_parts = event.split("`")
                return_dict.update({event_parts[0]: event_parts[1]})
        return return_dict

    def __repr__(self):
        print(f"Schedule with description '{self.description}'.\nTo get schedule in the dict form use 'to_dict' method.")