module.exports = {
    codes : [
        {
            qName : "Plus Minus",
            soln : `#include<iostream>

            using namespace std;
            
            int main() {
                int n;
                cin >> n;
            
                float pl = 0, mn = 0, zr = 0;
            
                for (int i = 0; i < n; i++) {
                    int val;
                    cin >> val;
                    zr += (val == 0);
                    pl += (val > 0);
                    mn += (val < 0);
                }
                
                zr = zr / (double)n;
                pl = pl / (double)n;
                mn = mn / (double)n;
                
                printf("%0.06lf\n%0.06lf\n%0.06lf\n", pl, mn, zr);
                return 0;
            }`
        },
        {
            qName : "Time Conversion",
            soln : `#include<iostream>
            #include<cstdio>
            
            using namespace std;
            
            int main() {
                string s;
                cin >> s;
            
                int n = s.length();
                int hh, mm, ss;
                hh = (s[0] - '0') * 10 + (s[1] - '0');
                mm = (s[3] - '0') * 10 + (s[4] - '0');
                ss = (s[6] - '0') * 10 + (s[7] - '0');
            
                if (hh < 12 && s[8] == 'P') hh += 12;
                if (hh == 12 && s[8] == 'A') hh = 0;
            
                printf("%02d:%02d:%02d\n", hh, mm, ss);
            
                return 0;
            }`

        }
    ]
}