/*##############################################################################

    HPCC SYSTEMS software Copyright (C) 2012 HPCC Systems.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
############################################################################## */

#option ('globalFold', false);

namesRecord :=
            RECORD
string20        surname;
string10        forename;
integer2        age := 25;
unsigned8       filepos{virtual(fileposition)}
            END;

namesTable := dataset('x',namesRecord,FLAT);

i := index(namesTable, { surname, forename, filepos } ,'\\home\\person.name_first.key');

string searchNameLow := 'Hawthorn' : stored('SearchNameLow');
string searchNameHigh := 'Hawthorn' : stored('SearchNameHigh');

dsx := i(surname >= searchNameLow and surname < searchNameHigh);
x := catch(dsx, skip);
output(x);

string20 searchNameLow20 := 'Hawthorn' : stored('SearchNameLow20');
string20 searchNameHigh20 := 'Hawthorn' : stored('SearchNameHigh20');

dsy := i(surname >= searchNameLow20 and surname < searchNameHigh20);
y := catch(dsy, onfail(transform(recordof(dsy), self.surname := FAILMESSAGE; self.filepos := FAILCODE; self := [])));

output(y);

z := catch(dsy, fail('Something awful happened'));

output(z);
